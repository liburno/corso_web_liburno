# corso Web: ~3.3 Installazione di Node js~ 

Nel corso dei capitoli precedenti abbiamo organizzato 3 tipi di macchine

- il mac: la macchina principale per lo sviluppo e il client per i vari server, funzionante in ambiente MacOs
- un server locale Raspberry con linux raspbian
- un server remoto predisposto da aws con linux Ubuntu server.

All'interno dei server sono stati installati solo gli strumenti di base, e nei limiti del possibile sono stati resi equivalenti, per cui da qui in poi ci riferiremo indifferentemente all'uno o all'altro in tutti i casi tranne quando non diversamente specificato.

Nel mac abbiamo installato git, e Microsoft code. Git è già installato nei server per cui non serve altro.

A questo punto ci resta da installare NodeJs sia nel mac che nei server. La procedura è diversa:

### installazione sul mac

Andiamo nel sito di nodejs: [https://nodejs.org](https://nodejs.org/en/), e seguiamo le indicazioni di download per la versione stabile. Al termine procediamo con l'installazione in modo standard e procedo,

### installazione sul server da terminale

Dopo esserci collegati al server remoto via ssh, digiteremo nel terminale un po' di comandi.

Come prima cosa è raccomandato l'update del sistema. Se non lo abbiamo già fatto precedentemente è il momento di farlo

```bash
sudo apt-get update
sudo apt-get dist-upgrade
```

a questo punto facciamo il download di node usando il comando curl. Guardando sul sito ho visto che la versione stabile ultima è la 12 per cui faccio il download di questa.

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

A questo punto installo node scrivendo:

```bash
sudo apt-get install -y nodejs
sudo apt-get install gcc g++ make  # tools 
```


### windows 

Se anzichè il mac, utilizzassimo per lo sviluppo una macchina windows . Per installarlo + puù semplice: dal sito di [node](https://nodejs.org/it/)
si procede all'installazione attraverso l'msi.

È tuttavia necessario (per alcuni pacchetti che installeremo successivamente) avere il compilatore gcc e python (sul server linux e sul mac  sono già presenti) e quindi bisogna 
avviare una istanza powershell **come amministratore** e digitare

```bash
 npm install --global --production windows-build-tools
```

### al termine

Verifico che tutto funzioni:

```bash
 node -v
 npm -v
```

### installazione di alcuni pacchetti globali

Node prevede l'installazione di pacchetti globali, ovvero sia comuni a tutti i progetti. si tratta solitamente di utilities CLI (linea di comando), e ne installeremo un paio:

* nodemon : serve durante lo sviluppo per riavviare il server a ogni modifica dei sorgenti, in modo da vedere in tempo reale le modifiche fatte sul codice. Questo pacchetto andrebbe installato solo sul mac, ma non ci sono controindicazioni per averlo anche sul server.

* node-gyp : serve ad attivare gli script python per la compilazione nativa di moduli di node. i pacchetti di node sono per lo più scritti in javascript, e non necessitano di compilazione, ma alcuni pacchetti a basso livello sono scritti in C++. in questo caso, vanno sempre compilati sulla macchina dove sono installati. La compilazione viene fatta usando il compilatore standard C++ `gcc` e il `make` che abbiamo installato precedentemente sul server, e sono stati installati sul mac con `XCode`. 


```bash
sudo npm install --global node-gyp
sudo npm install --global nodemon
```
