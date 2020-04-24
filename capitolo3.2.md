

# Corso WEB: ~3.2 AWS un server linux remoto su amazon~ 

Come alternativa al raspberry, vediamo in questo capitolo di installare e configurare una macchina remota linux, utilizzando quanto mette a disposizione AWS, il provider di server web di Amazon. 

Per l'esperimento che andiamo a fare la creazione di un server in questa piattaforma è gratuito per un anno e successivamente la cifra richiesta da amazon per la manutenzione si aggira su 7 euro al mese. 

Rispetto al PI, il server viene già fornito con un indirizzo ip pubblico, ed è facilmente scalabile, con una attenzione sul piano dei costi... Il server che andremo a configurare a cui assegneremo il nome `r65` sarà agli effetto dello sviluppo identico al `p64` che abbiamo visto nel capitolo precedente. Anche dal punto di vista delle prestazioni sono molto simili, garantendo entrambi 1GB di Ram, e 8GB di disco, estendibile fino a 30 con il piano gratuito.

![img|50%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00000.jpeg)


Per procedere con la piattaforma occorre registrarsi all'indirizzo [https://aws.amazon.com/](https://aws.amazon.com/).

La procedura è piuttosto semplice, ma richiede diverse fasi di controllo che necessitano di:
- una email valida
- una carta di credito valida
- un numero di cellulare valido.

Va da se, che i dati pubblicati sul server di amazon sono visibili a tutto il mondo e si capisce bene perchè la società cerchi di carpire informazioni "vere" sui titolari del conto. Per il mio esempi ho registrato una mail e un indirizzo che andrò alla fine del tutorial a rimuovere e che è `tergeste` (triestino arcaico).

Una volta registrati viene proposta la scelta del piano di utilizzo e nel mio caso ho ovviamente scelto il piano gratuito.


![img|50%|float-left px-3](https://images.croswil.com/public/@my/corso/jpeg/00001.jpeg)
![img|50%|float-left px-3](https://images.croswil.com/public/@my/corso/jpeg/00002.jpeg)

Fatto questo posso procedere alla creazione di una macchina virtuale creando una nuova istanza `ec2`, come nella foto


> Attenzione: AWS permette di decidere dove mettere la macchina ed è il caso di utilizzare un server "sotto casa". Per me la scelta migliore è Francoforte ma in europa ce ne sono altre 5.



![img|80%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00003.jpeg)

Qui cerco di stare attento tra le varie scelte messe a disposizione, scegliendo una macchina Ubuntu 64bit

e successivamente per le misure, il modello proposto gratuito `t2.micro`, con 1Gb ram e 8Gb disco. Prima di procedere oltre è bene dare uno sguardo a tutte le proposte, che coprono praticamente ogni esigenza, con una attenzione ai costi che sono di difficile interpretazione (c'è comunque un calcolatore nel sito). A onor del vero va detto che rispetto ad altri provider si paga solo a consumo e cifre molto abbordabili. 

![img|100%|float-left px-3](https://images.croswil.com/public/@my/corso/jpeg/00004.jpeg)

L'ultimo passo prima di confermare la macchina è fondamentale: creare un certificato (file con estensione .pem) per il collegamento ssh. Per ragioni di sicurezza il certificato va scaricato subito e utilizzato non appena la macchina sarà pronta.

Dopo una conferma AWS procede con la creazione della macchina e in un paio di minuti questa diventa disponibile, con un indirizzo pubblico.

![img|50%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00005.jpeg)

### procedere

Ecco come si presenta il desktop di aws a macchina ultimata: cambiare il nome del server  in r65, e prendere nota degli indirizzi ip assegnati, publici e privati (useremo il pubblico per i collegamenti)

![img|70%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00006.jpeg)

Una volta identifica l'istanza in esecuzione, gli posso cambiare nome e impostare le porte di accesso. Di default aws apre solo la porta 21 (SSH) mentre noi vogliamo la porta 80 e la 433 rispettivamente HTTP e HTTPS. Si possono aprire altre porte e basta selezionare nell'interfaccia sotto security launch wizard.

![img|50%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00007.jpeg)

Solo a questo punto saremo in grado di utilizzare il sistema come server WEB.

### Passiamo ora sul mac alla configurazione di SSH

ci siamo scaricati il file con il certificato `r65.pem` che sposteremo nella cartella nascosta `~/.ssh` (attenzione a non sovrascrivere alcun file). 
Andare sul terminale e scrivere:

```bash
cd       # vai alla cartella corrente
cd .ssh  # e quindi in ssh
chmod 400 r65.pem # mette il file in sola lettura
nano config
```
e nell'editor config aggiungiamo i criteri per il nuovo server: (l'indirizzo è quello che si vede nella console di aws)

```bash
Host r65 
Hostname xxx.xxx.xxx.xxx # inserire l'indirizzo ip pubblico 
User ubuntu
IdentityFile ~/.ssh/r65.pem
```

salviamo il file e verifichiamo che tutto funzioni come dovrebbe, digitando sulla shell

```bash
ssh r15  # accede al server remoto che abbiamo appena costruito, dopo conferma

### sul terminale remoto aggiorniamo il sistema
sudo apt update         # questo richiede un po' di tempo
sudo apt dist-upgrade   # e questo di piu
```

### normalizzazione del prompt

il prompt del terminale che il sistema propone è prolisso e voglio renderlo un po' più semplice. per questo dalla cartella home dell'utente (`/home/ubuntu`) edito il file nascosto `.bashrc` che contiene il batch di avvio del terminale:

```bash 
nano .bashrc ### 
```

e modifico le parti che contengono la definizione del prompt (3 righe con `PS1=....`)
```bash
...
## changes on PS1
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]@R65 \A\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}@R65 \A :\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}@R65 \A :\w\a\]$PS1"
    ;;
*)
    ;;
esac
...
```

Fatto questo il prompt alla connessione è più leggibile in quanto anzichè il nome dell'utente (ubuntu) e l'indirizzo IP mette solo il riferimento al nome da noi scelto e l'ora. 

> alla fine di questi due capitoli abbiamo creato due diversi server linux, uno in remoto con indirizzo pubblico e uno nella rete locale (ma virtualmente pubblicabile con DYN-DNS o altro). 
>Da qui in poi l'installazione degli strumenti lato server sarà la stessa




