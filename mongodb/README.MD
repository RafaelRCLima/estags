# Agregação - MongoDB

### Project

Agrupa os dados de acordo com os campos selecionados.
Se assemelha a um select em SQL do tipo 'select title, number from banco'

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

### Match

### Group

### Sort

### Skip

### Limit

### Unwind  