
# Corso Web: ~4 Creazione del primo progetto node~ 

Siamo finalmente pronti per iniziare con la programmazione in javascript utilizzando nodejs. 

Come prima cosa creiamo le cartelle per i progetti. Per default io raggruppo tutti i progetti web nella cartella sites e quindi dalla bash digito i seguenti comandi:

```bash
  cd                      # vado nella cartella home dell'utente
  mkdir sites  ;cd sites  # creo la cartella sites e mi ci sposto
  mkdir test   ;cd test   # creo la sottocartella test e mi ci sposto
  npm init -f             # inizializzo l'ambiente per nodejs creando il file package.json di default
  git init                # inizializzo git per questa cartella, al momento solo in locale, espanderemo il concetto piú avanti.
```

A questo punto avviamo visual studio code e apriamo la cartella appena creata.

Abilitiamo fin da subito il terminale integrato con il comando **command+`**.

nell'elenco dei files dovremo vedere package.json: questo è il file di configurazione di node attraverso il quale mantiene tutti i pacchetti e ne verifica l'installazione. 

Node permette di scaricare diverse librerie, che possono essere utilizzate dal progetto. Al momento in cui si installa un pacchetto (libreria) i suoi riferimenti sono inseriti in `package.json` e la libreria e tutte le sue dipendenze sono scaricate nella sottocartella `node_modules`. 

Il sito `https://www.npmjs.org` è il repository ufficiale per tutti i pacchetti node (ve ne sono centinaia di migliaia) ed è possibile consultarlo liberamente. Si possono anche pubblicare i propri pacchetti in forma pubblica  o privata, quest'ultima a pagamento. I pacchetti sono normalmente ordinati per `rank` e vengono riportati i download settimanali di ogni pacchetto. 

Andremo in questo esempio a installare uno dei pacchetti più gettonati, il server web `express` che al momento dichiara circa 12.000.000 di installazioni settimanali, (aumentando perciò di uno la statistica)

dal terminale scriviamo:

```bash
npm i --save express
```

l'istruzione --save dice di salvare il comando su package.json, per cui 
se apriamo il file dovremo vedere:
```javascript
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

nel prossimo capitolo del tutorial descriverò meglio la struttura di un file JSON (che comunque, come si vede è di per se molto leggibile).Useremo questo formato anche per i servizi in quanto consente di comunicare informazioni via web in modo chiaro e conciso.

Osserviamo solo la voce dependencies, dove è stata inserita la riga `express`, con a lato il numero `^4.17.1` 

Nella lista dei files mostrata da CODE dovremo inoltre vedere un file aggiuntivo `package-lock.json` (uso interno) e una cartella `node_modules`. 

Se apriamo la cartella `node_modules` dovremo vedere  una serie di sottocartelle corrispondenti alla libreria `express` e a tutti i riferimenti di cui questo `express` ha  bisogno. Sí, perchè ogni libreria inevitabilmente se ne porta dietro altre che ne possono contenere altre ancora. 

Basta dare guardare ad esempio la sottocartella `express` che mette in evidenza il proprio file `package.json` che contiene una lista molto lunga di dipendenze nei tag `dependencies` e `devDependencies`.

Il modello adottato da node è che ogni progetto contiene al proprio interno tutti i riferimenti a tutte le librerie da esso utilizzate e, molto importante nella versione specifica utilizzata.  (vedi sopra "express":"^4.17.1" dove il `^` all'inizio sta a significare quella specifica versione o una successiva). Se ho quindi diversi progetti che usano la libreria express, questa sarà inserita all'interno di ogni progetto, per cui si potrebbero avere progetti diversi che utilizzano versioni diverse della libreria.
 
Le versioni sono numerate con 3 numeri, in ordine di importanza per distinguere le major, e minor e i cambiamenti minori. la versione di default è `1.0.0`. In npm sono memorizzate tutte le versioni pubblicate, per cui se si ha bisogno di una specifica versione basta integrarla.

per capire meglio il funzionamento di node, proviamo a cancellare la cartella node_modules, o anche solo alcune delle sottocartella (command+del sull'elenco file). a questo avremo cancellato tutta l'installazione, ma ci rimane il file package.json

il comando 
```bash
npm i
```
rimette a posto le cose, riscaricando i pacchetti che mancano e cancellando quelli che non servono più. Non occorre pertanto occuparci del contenuto di questa cartella, anzi la escluderemo sempre dal salvataggio su git e dalle copie su altri sistemi operativi. Questa è una operazione necessaria in quanto su Linux magari esiste una compilazione diversa di quella presente su Windows

# Altri files:

`package.json` è il nome del file che contiene la configurazione di un progetto node. Ci sono altri files che aggiungeremo, con altre impostazioni. Spesso si tratta di **convenzioni** e non obblighi, ma è bene seguirle pediquessamente: renderemo i progetti più leggibili ad altri e ci eviteremo mal di testa quando dovremo integrarli.

In questo caso aggiungiamo altri due files alla cartella principale :

- `README.md`: è il file su cui costruiremo la documentazione in formato markdown. Markdown è il sistema in cui è costruito anche questo tutorial, dove anzichè utilizzare un editor grafico come Word o Pages, si può scrivere tutto usando metacomandi. il funzionamento di markdown è descritto più avanti.

- `server.js`: convenzionalmente l'applicativo server si chiama appunto cosí.

Creiamo anche due cartelle, anche qui convenzionali:

- `data`: dove memorizzeremo i dati accessibili ai `servizi web`, ma non necessariamente visibili dall'esterno direttamente.

- `dist`: dove memorizzeremo le pagine statiche HTML, CSS e immagini. Questa cartella con `VueJs` sarà generata automaticamente.


# il programma server:

```javascript
// richiede alcuni moduli
const path = require('path')
const express = require('express');
const app=express();

const port=3000;   // porta 

// imposta un middleware importante per la definizione degli header delle risposte http/https
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// collega la cartella dist in modo statico 
app.use(express.static(path.join(__dirname,'dist')));

// avvia il server sulla porta, in attesa di comandi.
app.listen(port,() =>{
    console.log(`Start server at: localhost:${port}`);
});
```
Per spiegare a grandi linee il programma, partiamo dall'analisi dei blocchi: all'inizio con l'istruzione `require` chiediamo a node di rendere disponibile quella particolare libreria. In questo caso i require riguardano `express` che abbiamo installato, e `path` che è una delle librerie di sistema preinstallate.

Successivamente abbiamo creato un oggetto `app` di tipo express, inizializzando il sito che abbiamo predisposto essere visibile sulla porta 3000 (i progetti node convenzionalmente utilizzano numeri da 3000 a 3100).

Poi abbiamo inserito con use un paio di `middleware`, nel primo integriamo all'header della risposta server il CROSS Origin. Non è necessario in questo caso, ma è per vedere come si fa. nel secondo:  `app.use(express.static(path.join(__dirname,'dist')));` abbiamo detto di utilizzare la sottocartella `dist` della cartella corrente e tutto il suo contenuto servendolo in modo statico.

Alla fine abbiamo avviato il server con `app.listen`, e la callback ci avvisa sulla console che l'operazione è andata a buon fine.

Per completare creiamo nella cartella dist un file 'index.html`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Test Application</title>
</head>
<body>
    <h1>Welcome to HTML</h1>    
    <p>index file loaded by express static content</p>
</body>
</html>
```

e per finire lanciamo dalla bash

```bash
   node server.js 
```

Se tutto funziona dovremo avere un messaggio che ci informa che il server è in ascolo per ogni richiesta sulla porta 3000 e quindi, aprendo il browser (firefox o safari), e digitando l'indirizzo `http://192.168.1.10:3000`, dovremo poter visualizzare il contenuto della pagina. 


Ora, senza altri indugi vogliamo spostare il progetto nel server R65. Per facilitare la pubblicazione, di ogni aggiornamento creiamo un file batch per la bash che chiamiamo `pubblica`

apriamo il file e digitiamo le istruzioni:

```bash
#!/bin/bash
rpat=r65:/home/ubuntu/sites/test  # ho definito una variabile, ma devo dare il percorso completo.
echo sync data to: $rpat       
# inserisco la sincronizzazione delle cartelle che mi servono singolarmente,
# in modo da commentarle se dovessi fare diversamente con una di esse: 

rsync -avz --del dist $rpat        
rsync -avz --del data $rpat        # probabilmente da commentare se voglio i dati dal server
# rsync -avz --del $rpat/data .    # alternativa alla riga sopra, per avere i dati dal server
rsync -zvh *.js package.json $rpat 
``` 

colleghiamoci quindi al server remoto su un'altra istanza del terminale integrato con `ssh r65` e spostiamoci sulla cartella `cd ~/sites/test`. analizzando il contenuto vedremo che si tratta di una copia integrale dei files che abbiamo richiesto.

a questo punto utilizziamo `npm` per installare le librerie

```bash
cd ~/sites/test
npm i
node server & # la `&` alla fine dice alla Shell di eseguire il comando e tornare a disposizione.
curl http://localhost:3000 # utilizzando il browser a linea di comando mandiamo la richiesta al nostro server 
```

a questo punto vediamo un'altro paio di comandi: 
`ps` ci mostrerà in i processi esecuzione: in linux a ogni processo viene assegnato un id, per cui scrivendo `sudo kill <id processo>`, si potrà terminare node.
in alternativa, per cancellare tutti i processi node in esecuzione si potrà utilizzare il comando `sudo pkill node`


> Arrivati a questo punto abbiamo creato il primo sito web funzionante in nodejs e abbiamo pubblicati i dati in remoto. Se la pubblicazione viene fatta sul server Raspberry nella rete locale, probabilmente lo possiamo già consultare all'indirizzo: `http://192.168.1.64:3000`, ma nel caso del server remoto non abbiamo aperto la porta 3000. Ci serve qualche ulteriore passaggio con `NGINX` che descriveremo nei capitoli successivi.


