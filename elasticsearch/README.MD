# ElasticSearch

Mecanismo de busca open source desenvolvido em cima do Apache Lucene
O que é Apache Lucene?
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

A forma que armazena os dados se divide em Cluster, Nodes, Indexes, Documents

Mapeamento através de API Rest, diferente do tradicional SQL.

É utilizado para buscas em aplicações, websites, análises de segurança, entre outros conforme o site oficial da [Elastic](https://www.elastic.co/pt/what-is/elasticsearch)


A biblioteca oficial do Elastic é @elastic/elasticsearch'
Após adicionada ao projeto a configuração básica para utilização é:
```
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:porta' })
```
### Índice

Conjunto de documentos que estão relacionados entre si.

```
await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using {es} ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })
}
```

