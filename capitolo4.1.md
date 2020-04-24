# Corso Web: ~4.1 intermezzo: il formato JSON~ 


**JSON**, acronimo per **JavaScript Object Notation**, è divenuto nel corso degli anni un popolare formato per lo scambio dei dati in applicazioni client-server e con nodeJS, è il formato principale per il salvataggio dei files dati su server.


### Origine di JSON

JSON è stato proposto come formato per lo scambio dati da Douglas Crockford, il quale ne ha anche definito le specifiche. Egli lo definisce così:

> JSON (JavaScript Object Notation) è un formato leggero per lo scambio di dati, facile da leggere e scrivere per gli esseri umani e facile da generare e analizzare da parte delle macchine. Si basa su un sottoinsieme del linguaggio di programmazione JavaScript, definito nelle specifiche ECMA-262, 3a edizione, del dicembre 1999. JSON è un formato di testo completamente indipendente dal linguaggio ma che usa convenzioni già familiari ai programmatori dei linguaggi derivati dal C, tra cui C, C++, C#, Java, JavaScript, Perl, Python e molti altri. Queste caratteristiche rendono JSON un linguaggio ideale per lo scambio di dati.

Crockford ha inoltre definito, oltre alla sintassi ed ai tipi di dati JSON, anche il tipo di contenuto con cui JSON deve essere servito nell’RFC 4627.

### Sintassi di JSON
JSON prende origine dalla sintassi degli oggetti letterali in JavaScript. Un oggetto letterale può essere definito così:
```json
{
"proprieta1": <valore>,
"proprietaN": <valore>
}
```
Si tratta di coppie di proprietà/valori separate dalla virgola ad eccezione dell’ultima. L’intero oggetto viene racchiuso tra parentesi graffe, o tra parentesi quadre in caso in un vettore.

A differenza di questa notazione JavaScript, che può contenere anche funzioni e valori complessi, JSON ammette solo valori semplici ed atomici, tra cui:

- **stringhe** delimitate da `"`: le stringhe non possono contenere caratteri speciali se non con la notazione `C`: una capo e` scritto per esempio come "\n" 
- **numeri**: interi o decimali
- **array**: delimitati da `[` e `]` e con gli elementi separati da ','
- **oggetti predefiniti** : sono soltanto 'true', 'false' e 'null'
- **oggetti** : delimitati da `{` e `}` e con i contenuti a coppia di stringhe

### esempio (package.json): 

```json
{
  "name": "imgs",
  "version": "1.0.0",
  "description": "imgs",
  "main": "server.js",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "sserve": "NODE_ENV=development nodemon server",
    "sbuild": "NODE_ENV=production node server"
  },
  "dependencies": {
    "argv": "0.0.2",
    "better-sqlite3": "^5.4.0",
    "body-parser": "^1.18.3",
    "express": "^4.17.1",
    "fetch": "^1.1.0",
    "module-alias": "^2.2.0",
    "sharp": "^0.22.1"
  },
  "devDependencies": {
    "vue-shortkey": "^3.1.7",
    "@fullhuman/postcss-purgecss": "^1.2.0",
    "@vue/cli-plugin-babel": "^3.8.0",
    "@vue/cli-service": "^3.10.0",
    "postcss-nested": "^4.1.2",
    "tailwindcss": "^1.0.6",
    "vue": "^2.6.10",
    "vue-router": "^3.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack-preprocessor-loader": "^1.0.4"
  },
  "nodemonConfig": {
    "ignore": [
      "data/*",
      "dist/*",
      "css/*",
      "src/*",
      "public/*"
    ]
  }
}
```

JSON inizia con una coppia di parentesi graffe che racchiudono il corpo dell’intera struttura. Seguono poi le coppie di proprietà e valori che, come in questo esempio, possono contenere i valori atomici elencati sopra. 

A differenza degli oggetti letterali, JSON richiede che i nomi delle proprietà e i valori stringa siano racchiusi tra doppie virgolette. Attenzione a maiuscole, minuscole!

JSON non perdona gli errori, una virgola di troppo o una sintassi leggermente errata. Per questo su web esistono strumenti di validazione che permettono di verificare gli errori.

### JSON e javascript. 

Javascript ha due metodi per trasformare un oggetto qualsiasi in JSON e da un JSON di nuovo all'oggetto. La conversione indietro non è retrocompatibile con gli oggetti che contengano come membri funzioni, che sono completamente ignorate. i metodi sono `JSON.stringify` e `JSON.parse`

vediamo questo esempio di codice, e magari proviamolo in un file di test.

```js
  var a={
     nome:'paolo',
     cognome:'rossi',
     abita:{
        via:'roma'
        localita: 'asiago'
     },
     amici: ['topolino','paperino','pluto'
  }
  var b=JSON.stringify(a,null,2) // I parametri aggiuntivi servono a una formattazione 'bella'
  console.log(b);
  var c=JSON.parse(b)
  console.log(c)
```

 





 