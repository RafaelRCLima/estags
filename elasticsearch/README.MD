# ElasticSearch

Mecanismo de busca open source desenvolvido em cima do Apache Lucene
Apache Lucene é uma engine de busca full-text conhecida pela sua velocidade no momento de indexação.

O ElasticSearch abstrai a API do Lucene para fazer pesquisas full-text.
Seu grande diferencial é sua velocidade de execução.

Funcionalidades

Disponibiliza dados em tempo real
pode ser distribuído e configurado para apresentar alta disponibilidade
é orientado a documentos
disponibiliza uma API restFul

Armazenagem fica em forma de documentos
Disponibiliza os dados em forma de JSON

A forma que armazena os dados se divide em Cluster, Nodes, Indexes, Shards, Replicas e Documents

Mapeamento através de API Rest, diferente do tradicional SQL.

É utilizado para buscas em aplicações, websites, análises de segurança, entre outros conforme o site oficial da [Elastic](https://www.elastic.co/pt/what-is/elasticsearch)

A biblioteca oficial do Elastic é @elastic/elasticsearch'
Após adicionada ao projeto a configuração básica para utilização é:
```
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:porta' })
```

### Cluster

Conjunto de de 1 ou mais nós/nodes.

### Índice

Conjunto de documentos que estão relacionados entre si.

O padrão de inserção apresentado pelo site ElasticSearch

```
await client.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })
}
```

Padrão de pesquisa do site do ElasticSearch

```
await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    body: {
      query: {
        match: { character: 'Tyrion' }
      }
    }
  })
```
### Nodes

Nodes ou nós, como em qualquer cluster se trata de uma instâcia de ElasticSearch.
Nodes podem ser eleitos como Master Node tornando-se o responsável pelo papel principal.
Master Nodes garantem a integridade do Cluster, distribuição dos shards, entre outros.

### Shards

Mais baixo nível da estrutura de dados do Elasticsearch.

"Pedaços" do índice

Um índice pode ser "quebrado" em partes onde cada uma delas é um Shard
Isso lembra Bancos Relacionais Distribuídos, em um caso onde os dados não são replicados

Quanto mais shards maior desempenho de escrita e menor em leitura.
O ideal é que cada shard tenha menos de 50GB.


### Replica

Replica os dados de um Nó e seus Shards. Serve para proporcionar opções de busca adicionais para o caso de uma instância estar sobrecarregada.

Formato de POST

POST catalogo/_doc/
{
	"chave": "valor" 
}

Um índice é um banco de dados?
Todo documento tem o seu ID e caso este não seja passado na criação é criado um tipo de id alfanumérico grande.

Para inserir com um ID

POST catalogo/_doc/1
{
	"chave": "valor" 
}

A diferença é que o valor o Id é passado na criação.

É possível fazer updates também

POST catalogo/_update/1
{
	"doc" : {
		"chave": "valor"
	}
}

Devem ser passados o índice no comando, e nos argumentos o nome do documento , o campo a ser alterado e o novo valor.

### Formato GET

GET catalogo/_count

Consultar doc específico através do id

GET catalogo/_doc/1

Busca geral
GET catalogo/_search

Termo de pesquisa
GET catalogo/_search/?q=futebol
Lembra query params

Este tipo de pesquisa é mais avançada porque não é necessário indicar em qual campo deve ser buscada a palavra "futebol", já que o ElasticSearch busca em todo o índice por matches.

### CONCEITOS

Para associar com bd relacionais
Post => insert
Get => select
Put => update
Delete => delete

### HTTP HEAD

Se um documento existe retorna verdadeiro, caso não, falso, mas em formato http, ou seja, 200 para true e 404 para false.

HEAD catalogo/_doc/1
Deve retornar 200 ok se o documento de id 1 existir e 404 not found se não existir.

HEAD não tem corpo de resposta

PUT
Lembrete - Atualiza o documento existente ou o cria com o Id fornecido.

PUT catalogo/_doc/50
{
	"chave": "valor"
}

A cada inserção o campo "version" é atualizado representando quantas vezes foi atualizado, isso porque os documentos são imutáveis, sendo alteradas então somente as versões atuais de cada um deles como novos documentos.

### DELETE

DELETE catalogo/_doc/50

### BUSCA LIVRE

O Elastic cria um campo chamado "_all"
Útil quando não se sabe qual o campo possui o dado desejado.

Concatena todos os dados de um documento para poder buscá-los de forma rápida
ex.:

{
	"nome": "João da Silva",
	"idade": "27",
	"pais": "Brasil"
}

é transformado em:
João da Silva 27 Brasil

Por isso o ElasticSearch consegue fazer a busca sem a necessidade de se especificar o campo desejado.

### BUSCA ESPECÍFICA

GET catalogo/_search/?q=pais:Brasil
Pesquisa do valor 'Brasil' no campo 'pais'.

### CABEÇALHO

took => quantidade de milisegundos utilizados para finalizar a requisição
timed_out => determina se a busca falhou por tempo limite com valor booleano
shards => contém atributos para indicar em quantos shards foram encontrados dados, quantos tiveram sucesso na busca, quantos pularam e quantos falharam.
hits => resultado da busca em sim, a primeira parte apresenta quantos itens foram encontrados e a segunda os itens em si. O max_score apresenta valores de 0 a 1 de acordo com a relevancia analisada em relação ao conteúdo.

### PAGINAÇÃO

GET catalogo/_search/?q=futebol&size=10&from=30

size = qtde de documentos a serem exibidos
from = qtde de docs a ser pulados para começar a buscar dados, comportamento igual ao skip de mongo (para não pular deve ser colocado 0).

### MAPEAMENTO (Mapping)

Uma forma de criar 'tabelas' se comparando com bd's relacionais
Quando não informado, o ElasticSearch se utiliza da inferência para automaticamente o tipo de dado a partir do documento.

Para descobrir como este mapeamento está sendo feito:

### GET catalogo/_mapping

Consegue mapear os tipos de dados dos atributos

--------(IMAGEM AQUI)----------

### SCORE
Valores de 0 a 1 que indicam o nível de relevancia de um documento para uma pesquisa.

### ÍNDICE INVERTIDO
Armazena palavras como "Tokens" as associando com os seus respectivos arquivos json onde podem ser encontradas.

Para encontrar esses tokens o ElasticSearch usa analisadores.

### ANALISADORES COMUNS

Espaço em branco: Cada espaço em branco é utilizado para quebrar as palavras, mas leva junto pontuação

Padrão: Ignora virgulas e pontos além dos espaços em branco e deixa tudo em caixa baixa, mas inclui números

Simples: Parecido com o padrão, mas não inclui números.

Idioma: O mais importante. Além das funções do simples, remove acentuação, reconhece plural e armazena no singular, tem espaço para criar 

A seguir cada um dos tipos de analisadores tem sua saída em formato JSON conforme descrito acima.

Utilizando Standard
GET catalogo/_analyze
{
	"text": "texto a ser analisado"
}

Utilizando Simple
GET catalogo/_analyze
{
	"analyzer": "simple"
	"text": "texto a ser analisado"
}

Utilizando White Space
GET catalogo/_analyze
{
	"analyzer": "whitespace"
	"text": "texto a ser analisado"
}

Utilizando language
GET catalogo/_analyze
{
	"analyzer": "portuguese"
	"text": "texto a ser analisado"
}

É possível criar um índice já com os tipos de dados e analisador declarados. (O mapeamento pode ser MANUAL)

PUT catalogo_V2
{ 
	"settings": {
		"index": {
			"number_of_shards":  3,
			"number_of_replicas": 0
		}
	},
	"mappings": {
		"formação": {
			"type": "text",
			"index": true,
			"analyzer":  "portuguese"
		}
	}
}

Com isso ao executar uma busca com palavras com ou sem acento, maiúsculas ou minúsculas, plural ou singular o resultado será apresentado.

### ANALIZERS COM SINÔNIMOS

Configuração padrão do analizer "portuguese"

---------(IMAGEM AQUI)--------------

Podem ser adicionados sinônimos em formato de filtro no momento da criação de um índice para que sejam utilizados nas pesquisas como no exemplo:

---------(IMAGEM AQUI)--------------

Com isso ao rodar
GET indice_com_sinonimo/_analyze
{
	"analyzer": "sinonimos",
	"text": "eu gosto de jogar society"
}

Ao criar os tokens que serão adicionados no índice invertido os valores do campo synonym também serão adicionados além da palavra society.

---------(IMAGEM AQUI)--------------

Com isso o valor score dessas palavras será menor ao serem identificadas, mas a associação será feita.

CURIOSIDADE: Apesar de utilizar PUT em sua criação, um índice não pode ser atualizado, precisa ser removido e reinserido.

HIERARQUIA DE SINÔNIMOS

Alguns valores não podem ser retornados como sinônimos, como por exemplo, vôlei, basquete e futebol são esportes, então em uma análise levando em consideração somente a palavra esporte todos os valores são válidos, mas no caso de uma análise da palavra futebol, não pode acontecer de ser retornado um valor como basquete ou vôlei.

Para isso serve a hierarquia de sinônimos que pode ser declarada da seguinte forma com o operador de indireção (=>):

"synonyms": [
	"futebol => futebol, society",
	"society => society, futebol",
	"esporte => esporte, futebol, society, volei, basquete"
]

---------(IMAGEM AQUI)--------------

Forma de indexar com sinônimos reproduzindo o funcionamento do analyzer portuguese

---------(IMAGEM AQUI)--------------

O Analyzer portuguese por trás faz isso com as palavras além de retirar os 's' no final das palavras, então com essa configuração o comportamento é reproduzido.

O exemplo abaixo representa uma forma de indicar dois tipos de análise
O primeiro em 'analyzer' é o primeiro a ser executado, gerando a tokenização dos valores
O segundo serve para análise somente de busca, criando os tokens somente no momento da pesquisa, evitando de inflar o índice invertido com muitos dados.

---------(IMAGEM AQUI)--------------
