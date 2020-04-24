# Corso WEB: ~3. Strumenti di sviluppo~ 

Come dichiarato all'inizio, per procedere è richiesta una certa familiarità con alcuni strumenti di programmazione: `javascript` o `es6`, `html5` e `css`. Vi sono centinaia di corsi su questi argomenti che esulano dallo scopo di questo tutorial e che invito a consultare se mancano le conoscenze di base.

Per quanto riguarda invece la programmazione da terminale (bash) è necessario avere una infarinatura di base, ma illustrò di volta in volta i comandi utilizzati.

### Visual studio `CODE`.

il primo strumento che installeremo  è Visual Studio CODE. E' un editor ideale per la scrittura di programmi, scritto da Microsoft, è molto diverso dagli altri prodotti creati dall'azienda di Richmond.

E' infatti scritto in `ES6` basandolo sulla libreria `Electron` (vedi GitHub). E' un prodotto libero e i suoi sorgenti sono consultabili su `GitHub`. L'editor é disponibile sia per Windows, che per Mac che per Linux, e per me, oggi, è il miglio strumento disponibile sul mercato 

Vi sono alternative interessanti come `Atom` o `Sublime Edit`. La scelta dell'editor è personale, ma da qui in poi farò riferimento solo a Visual Code, o `mscode` o semplicemente `code`

> **installazione**: sul sito [code](https://code.visualstudio.com) segui le istruzioni per il download.

Di default con collego `code` a `git` e installo alcune estensioni. Per installare e visionare l'elenco delle estensioni esiste un'incona a sx dell'editor (la quarta) tramite la quale si possono cercare, installare e disinstallare tutte le estensioni disponibili in un apposito repository.

Le estensioni che utilizzo sono poche ma utili:

- `Markdown Preview Enhanced`: mi permette di vedere in anteprima i files `Markdown` con i quali scriverò tutta la documentazione relativa al progetto: Questo tutorial è interamente scritto utilizzando Markdown, e in un prossimo capitolo ne illustrerò la sintassi.

- `REST Client`: permette di collaudare direttamente da `code` i servizi json che costruiremo

- `Vetur`: Gestione di sintassi per `VUEJS`

- `vscode-pdf`: Preview integrato per i files PDF. capita spesso di voler accedere a files pdf, ed è comodo farlo direttamente da `code`. 

Ovviamente vi possono essere molti altri addon interessanti, ed consiglio di cercarne e installarne qualcuno. se non si è soddisfatti li si possono comunque facilmente disinstallare.

### XCODE. 

`Xcode` è il progetto che raggruppa tutti gli strumenti per sviluppare sul mac. Noi ne useremo solo una minima parte, ma è per me più comodo avere l'intero ambiente installato. 

Mette a disposizione il compilatore gcc, make, git e altre cose che mi saranno utili successivamente e non devo perdere tempo a cercare. I tempi di installazione sono piuttosto lunghi.

Va installato tramite `AppStore` 

### GIT/ Github

Git è uno strumento essenziale per la gestione del versionamento dei files, utile per la manutenzione del codice sorgente. Questo strumento, scritto da Linus Torwalds, è in realtà a oggi lo standard per la gestione del codice. 

Consiglio fortemente di integrarlo a GitHub. Github è il server per eccellenza per git. Ci si può registrare gratuitamente e avere un proprio indirizzo per tutti i progetti personali. I progetti memorizzati su GitHub possono essere pubblici o privati. E' gratuito per un numero piccolo di progetti, o è possibile acquistare una licenza professionale o aziendale, per rispettivamente 7€ o 9€ al mese, che da più spazio e la possibilità di avere un numero di progetti illimitati. 

Github non è necessario, tant'è che si puo creare facilmente il proprio server Git, ma secondo me non è il caso. 

Github fornisce tutto, comprese api per l'accesso; è facile e sicuro, ed è oggi il migliore "social" per la programmazione, per la condivisione di progetti e per poter  lavorare sullo stesso progetto anche con migliaia di collaboratori. 

I maggiori progetti pubblici (Node, Vue, Linux, Code...) sono su github e sono spesso gestiti da migliaia di programmatori.

Successivamente creerò un capitolo dedicato ai comandi git, in cui accennerò anche a GitHub. Github è anche integrato in Code, anche se preferisco sempre configurarlo inizialmente da terminale.

### Firefox

Safari é un ottimo browser per il web, ma per lo sviluppo e il debug per me niente supera `Mozilla Firefox`. Si potrebbe installare anche chrome, o cromium ma su tutti preferiso Firefox. E' importante avere almeno due browser installati:

- per vedere le differenze di visualizzazione della stessa pagina web. Sono sottili ma spesso ci sono!
- perchè è meglio separare la navigazione che si fa con il browser di tutti i giorni da quella che si fa durante lo sviluppo, dove si devono spesso provare cose che magari non funzionano o sono in grado di bloccare l'applicativo
- perchè firefox ha una gestione ottimale del debug.

Consiglio inoltre di rimuovere sempre e a prescindere google dai motori di ricerca e sostituirlo con uno meno invasivo come duckduckgo. Sarà utile anche successivamente per lo `scraping`.


### nodeJS

E' il motore per lo sviluppo di applicazioni web. L'installazione la si fa direttamente seguendo le istruzioni del [sito](https://nodejs.org/it/). 

una volta installato andare sul terminale e digitare:

```bash
node -v # mostra la versione installata di node 
npm -v  # mostra la versione installata del packagemanager di node, ossia npm

```


### ssh 

La remote shell è già installata nel mac, ma occorre installare sshserver sui vari server per il controllo remoto, vedere il capitolo.



### Opzionali:

Ho installato un pacchetto dall'appstore che si chiama `LanScan` questo permette di monitorare tutti i dispositivi collegati alla rete locale.

Utilizzo spesso anche `BeyondCompare` un tool per la comparazione di cartelle e files a livello locale, molto utile quando si devono capire le differenze tra una versioni diverse del progetto o di progetti simili memorizzate localmente



