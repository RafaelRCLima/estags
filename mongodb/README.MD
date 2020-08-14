# Agregação - MongoDB

### Project

Agrupa os dados de acordo com os campos selecionados.
Se assemelha a um select em SQL do tipo 'select title, number from banco'

O que o Project faz é gerar um novo documento com um sub-conjunto do documento atual com os campos selecionados.

No caso da existência de um banco que contenha os dados a seguir:

```
{"id": 1, "nome": "Jorge", "estado_civil": "solteiro"},
{"id": 2, "nome": "Tania", "estado_civil": "solteira"},
{"id": 3, "nome": "Augusto", "estado_civil": "casado"},
{"id": 4, "nome": "Katia", "estado_civil": "casada"},
{"id": 5, "nome": "Betania", "estado_civil": "casada"}
```

Utilizando project com mongoose é possível retornar somente os nomes com o trecho de código:

```
banco.aggregation([{$project: { "nome": 1 }}])
```

O resultado dessa query fica:

```
[
  {"id": 1, "nome": "Jorge"},
  {"id": 2, "nome": "Tania"},
  {"id": 3, "nome": "Augusto"},
  {"id": 4, "nome": "Katia"},
  {"id": 5, "nome": "Betania"}
]
```

### Match

É semelhante a um select com where em SQL onde caso atenda a especificação o dado é retornado.
Ele recebe um parâmetro e o utiliza na query para trazer somente os documentos que possuem este valor.

### Group

Utilizado para agrupamento de dados, possui as opções $sum, $avg, $min, $max, $first, $last, $push, $addToSet e é acompanhado de um _id determinando qual a chave selecionada para o agrupamento.

### Sort

Método de ordenação do MongoDB, traz os dados ordenados de forma crescente quando atribuito '1' e decrescente quando '-1'. Deve-se também determinar quais dados serão utilizadas para a execução.

### Skip

Pula certa quantidade de documentos selecionada, pode ser usado no contexto de paginação para pular dados já exibidos na página anterior.

### Limit

Limita a quantidade de documentos a ser retornados pela query.

### Unwind  

Para cada documento que contém um array gera N documentos, um para cada item do array, mantendo a estrutura original do documento.