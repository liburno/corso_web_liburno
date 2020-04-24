# Corso Web: ~6. Creazione del backend nodejs~ 

Passiamo a illustrare i passi necessari per creare un server node.js che abbia un suo sistema di autenticazione e possa gestire servizi con protocollo JSON.

Procediamo con l'installazione di una cartella `progetto1' : 

```bash 
mkdir ~/sites/progetto1 ; cd ~/sites/progetto1
npm init -f
# crea la struttura delle cartelle
mkdir dist src srcbk public data css data/_files 
 # crea alcuni files vuoti 
touch server.js dist/index.html readme.md .gitignore pubblica service.rest
git init
```
Le cartelle, che non useremo tutte in questa prima fase definiscono:
* **dist**: la cartella contenente la parte statica del sito, generalmente questa cartella è creata automaticamente dalla compilazione di `vue` che vedremo più avanti.
* **src**: i sorgenti del frontend
* **srcbk**: i files sorgenti del backend, per i servizi
* **public**: serve a VueJS per replicare il contenuto statico su `dist`.
* **css**: contiene i sorgenti dei files `css` che saranno compilati da tailwind sulla cartella `dist`
* **data** contiene i dati di backend dell'applicazione. se alcuni di questi devono essere resi pubblici vanno salvati nella cartella `data/_files` e saranno visti all'esterno con l'indirizzo `public` (vedi configurazione json sotto).

Procediamo per ordine con i vari files.

* .gitignore: ne abbiamo già parlato precedentemente, serve a indicare a git quali cartelle ignorare nella sincronizzazione del progetto: sicuramente `node_modules` e nella gran parte dei progetti anche `dist`, che può essere autogenerato e `data`

```bash
node_modules
old
```

* dist/index.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Progetto1</title>
</head>
<body>
    <h1>Progetto1 Static contend</h1>    
    <p>index file loaded by express static content</p>
</body>
</html>

```
*** README.md

```.
### progetto1 

documentazione **todo**!
```

Modifichiamo il file Package.json aggiungendo una sezione `config` dove imposteremo le configurazioni del progetto:

```json
  "config": {
    "login": true,
    "isguest": true,
    "register": true,
    "datafolder": "data/_files",
    "pathdiz": "~/sites/auth",
    "dbauth": "~/sites/auth/auth.db",
    "static": {},
    "port": 3000,
    "sito": "http://localhost:3000"
  }
```

Spieghiamo una per una le voci:

* **login**: indica se il sito può deve disporre di un sistema di login utente. 
* **guest**: indica se il sito può lavorare senza registrazione dell'utente (utente guest)
* **register**: indica se il sito può permettere la registrazione web di nuovi utenti.
* **bkdoor**: se vi sono dati dinamici pubblici indica dove saranno locati, e serviti dall'indirizzo  `<nomesito>/public`: si tratta normalmente di files JSON o immagini create dinamicamente dal sito, che pertanto non possono risiedere nella parte statica (DIST).
* **pathdiz** crea una variabile di ambiente per l'accesso a una cartella condivisa a diversi siti (dove possono risiedere database comuni a diversi progetti, come quello delle autorizzazioni). Diversarsamente tutti i dati utilizzati dal backend si troveranno nella cartella `data`.
* **dbauth** database delle autorizzazioni. si tratta di un database chiamato appunto "auth.db" dove sono registrati i vari utenti e i loro livelli di accesso. Normalmente è comune a tutti i siti. Se non indicato verrà usato `data/auth.db`, creato in automatico con 3 utenti: 'level1', 'level2' e 'level3', e password uguali al nome utente!
* **static** : un elenco di altre cartelle statiche che si possono mettere a disposizione: il formato è '<nomepubblico>':'<path>'. Attenzione, questo apre diversi folder 

Nel file config.json sostituiamo inoltre altre tre parti:

```json
  ..
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "sserve": "NODE_ENV=development nodemon server",
    "sbuild": "NODE_ENV=production node server"
  },
  "authors": [
    "istro tergeste <istro.tergeste@gmail.com>"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tergeste/progetto1.git"
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
  ...
```
Anche qui qualche spiegazione:

* **authors**: sostituise `author`, inserito di default, e convenzionalmente indica l'elenco degli autori del progetto, con le loro mail. Quasi tutti i progetti node (basta curiosare all'interno di node_modules) usano questo formato.

* **repository**: indica il percorso git dove è salvato il lavoro. Questo formato è utile quando si voglia pubblicare un progetto su `npmjs` 

* **scripts**: ho cambiato il default (test) con quello che utilizzeremo: vi sono quattro voci, due per il modo server: `sserve` e `sbuild` e altre due per il modo client, per la compilazione del frontend `vue` che vedremo più avanti: `serve` e `build`. 

Se guardiamo la voce `sserve` sugli script, vedremo che utilizza [nodemon](https://nodemon.io/). Si tratta di un servizio che fa ripartire il server node dopo ogni modifica salvata sui files: per questo abbiamo inserito nel package.json anche la voce `nodemonConfig` dove indichiamo le cartelle che non devono essere prese in considerazione per il riavvio del server (tutte tranne srcbk!).

Assicuriamoci di averlo installato globalmente:

```bash
npm install -g nodemon
``` 

### installazione della libreria Liburno_bklib

La gestione dei servizi, passa per l'installazione della libreria di base;

liburno_bklib include:

* il supporto per leggine `express`
* il database SQLite (via `better-sql`)
* post e get da altri siti con `node-fetch`
* la possibilità di inviare messaggi via posta tramite `nodemailer`
* la decodifica json dei parametri tramite `body-parser`

La libreria predispone inoltre un sistema di autenticazione integrato, da utilizzare nei servizi. ne parleremo in dettaglio nei capitoli successivi.

Per proseguire installiamo `liburno_bklib`

```bash
npm i liburno_bklib
```



 