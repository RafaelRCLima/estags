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

### Replica

Replica os dados de um Nó e seus Shards. Serve para proporcionar opções de busca adicionais para o caso de uma instância estar sobrecarregada.

