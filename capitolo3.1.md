# corso Web: ~3.1 Raspberry pi3~ 

In questo capitolo vedremo come installare da zero il sistema operativo su un Raspberry e creeremo una connessione remota sicura con il mac, per poterlo gestire direttamente dal PC

### abbiamo bisogno di:

* un Raspberry [Pi3](https://www.amazon.it/Raspberry-PI-Model-Scheda-madre/dp/B01CD5VC92/ref=sr_1_4?__mk_it_IT=ÅMÅŽÕÑ&crid=CYT7FHJ9882X&dchild=1&keywords=raspberry+pi+3&qid=1585656547&sprefix=raspberr%2Caps%2C278&sr=8-4) o  [Pi4](https://www.amazon.it/RASPBERRY-PI-ARM-Cortex-A72-Bluetooth-Micro-HDMI/dp/B07TC2BK1X/ref=sr_1_3?__mk_it_IT=ÅMÅŽÕÑ&dchild=1&keywords=raspberry+pi+4&qid=1585656641&sr=8-3), con il loro rispettivo alimentatore. 
* una tastiera USB 
* un cavo HDMI/HDMI (pi3) o  HDMI/microHDMI (pi4)
* un monitor o tv con uscita HDMI
* una scheda microSD con il convertitore SD per usarla sul PC da 16/32 gb. E' meglio scegliere una scheda veloce, come [questa](https://www.amazon.it/SanDisk-MicroSDHC-Adattatore-Performance-Velocità/dp/B073JWXGNT/ref=sr_1_4?__mk_it_IT=ÅMÅŽÕÑ&dchild=1&keywords=micro+sd+32gb&qid=1585656892&sr=8-4). 

Si può ovviamente utilizzare una scheda di dimensioni maggiore, ma bisogna tener conto che i tempi di backup si allungano. 

Per me, a parte il costo è meglio partire con un pi3 con una scheda da 8/16GB

A parte il download e l'installazione di raspbian (paragrafo successivo), potremo fare le stesse operazioni anche su un vecchio PC o notebook, dove installeremo l'immagine iso di Ubuntu 18.x server.


### download e installazione del sistema operativo.

Sul [sito](https://www.raspberrypi.org/downloads/) si può installare l'`image downloader`, un programma che aiuta a scaricare l'immagine da utilizzare:

- inseriamo una scheda SD sul mac e scegliamo tra i sistemi operativi, `Raspbian others` e `Raspbian lite`. Il default che viene proposto ha il desktop grafico che non andremo a utilizzare in quanto ci collegheremo al Raspberry **sempre** da remoto, con `ssh` una volta completata l'installazione. L'immagine complessiva è di 400Mb, quindi ci vuole un po' di tempo per scaricarla.

- in alternativa si può andare sul sito [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/), dove si trovano le immagini iso pronte da scaricare. Questo consente di scaricare su Mac un file che può essere utilizzato ogni volta che si deve fare una installazione. Anche in questo caso scelgo la versione lite. Non mi preoccupa che sia aggiornata, in ogni caso l'aggiornamento può essere eseguito anche dopo l'installazione. E' un po' più complicato masterizzare la sd card ma possono essere seguite le [istruzioni](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md), o scaricare un sofware come [etcher](https://www.balena.io/etcher/)

- una volta fatto tutto e masterizzata la SD card la si mette sul Raspi e, collegata tastiera e monitor lo si accende. 

Dovrebbe avviarsi come un vecchio PC, con una serie di messaggi sullo schermo che mostrano l'avanzamento dell'avvio. La prima volta l'avvio richiede un tempo maggiore in quando il sistema deve fare alcune operazioni preliminari sulla scheda SD (espansione)

Si arriva dopo un po' al prompt dove viene chiesto nome utente `pi` e password `raspberry`. 

Si consiglia sempre di cambiare utente e password di default.

A questo punto dobbiamo fare un po' di configurazioni: nome assegnato alla macchina, password, lingua rete wifi, accesso ssh che faremo tutte utilizzando l'utility `raspi-config`

```bash
sudo raspi-config   # eseguo in modalità root
```

A questo punto seguiamo il menu:
- **change user password**: inseriamo una nostra password per accedere al sistema 
- **network options**: impostiamo un nome per il raspberry: normalmente preferiso un nome corto, in genere p{ip} ossia p seguito dall'ultima cifra dell'indirizzo ip a cui lo voglio collegare, ad esempio. se il mio indirizzo fosse `192.168.1.64` il nome sarebbe `p64`
- impostiamo l'accesso **WIFI** : WI-FI `country=it` e il nome della connessione wifi e password 
- passiamo al menu localization, 'change locale' e selezioniamo it , rimuovendo en.
- impostiamo il layout della tastiera: selezionare prima il tipo di tastiera (il default proposto va quasi sempre bene) e all'invio ci chiede di selezionare il layout (italian) e alla fine l'impostazione per una serie di tasti (default)
- per finire '''importante''' impostiamo in **interfacing options** (P2) SSH Enable=true. questo consentirà al sistema di accettare un collegamento remoto.

Fatto questo usciamo dal programma `raspi-config`; il sistema dovrebbe chiederci se vogliamo un reboot. In questo caso, anche se non lo chiede, per sicurezza è meglio farlo con l'istruzione:

```bash
sudo reboot now
```

Dopo il riavvio, risponderemo con le nuove credenziali a utente `pi` e password `nuova password`. 

Verifichiamo se la tastiere funziona correttamente e soprattutto se è attivo il collegamento WIFI: per questo utilizziamo il comando `curl`, ossia il browser testuale di linux 

```bash
curl www.google.com
```

dovremo vedere un sacco di testo, per la verità non molto leggibile, ma chiaro indicatore che il collegamento funziona.


Se invece non funziona, armiamoci di pazienza e riproviamo con il raspi-config.

L'istruzione `ifconfig` ci mostra in ogni caso l'indirizzo automaticamente assegnato al raspberry. Nel caso un cui si voglia forzare uno specifico indirizzo bisogna intevenire sul file di sistema `dhcpcd.conf` 

```bash
  sudo nano /etc/dhcpcd.conf
```
e impostare le seguenti linee, (adattando ovviamente l'indirizzo IP che si vuole assegnare e i valori corretti per router e domain_name_server. 

Alla fine di questa operazione è meglio riavviare il server e testare se il collegamento funziona ancora. 

```bash
 interface wlan0
   static ip_address=192.168.1.64/24
   static routers=192.168.1.1
   static domain_name_servers=192.168.1.1
```

Certificato che il collegamento web funziona **ci spostiamo il mac**  e apriamo un terminale dal quale proviamo a collegarci con il nostro server.

```bash
# comandi sul mac terminale
ssh pi@192.168.1.64
```

Dopo un messaggio di sicurezza (da accettare) e la richiesta di login e password per il PI, saremo collegati con il raspberry.

Da qui in poi la strada è in discesa in quanto non avremo più bisogno di monitor e tastiera per il PI, ma lo potremo completamente gestire dal mac: 
facciamo uno shutdown (spegnimento)

```bash
sudo shutdown now
```

Rimuoviamo tastiera e monitor e lasciamo solo la nostra scatoletta e la riaccendiamo. Passato circa un minuto il PI sarà completamente operativo e accessibile dal terminale del mac con il comando `ssh` visto precedentemente.

> se per arrivare fino a qui vi sono state delle difficoltà consigliamo di ripetere e provare ogni singola procedura, in particolare ricordarsi di abilitare ssh su raspi-config e impostare correttamente la rete wireless. 

# update

A questo punto, dal mac abbiamo il controllo completo sul server raspberry e quindi procediamo con il completamento dell'installazione.

Raspbian, basato su `Ubuntu` utilizza `apt` come software per la gestione dei pacchetti. 
Eseguiremo quindi un aggiornamento del sistema. Per farlo dobbiamo accreditarci come supervisori. vi sono 2 modi:

- digitando `sudo` prima di ogni comando
- digitando una sola volta `sudo su` per mettersi i modalità supervisore (notare il cambiamento del prompt che anzichè `$` alla fine ha `#`): salvo che per configurazioni iniziali sconsiglio questo modo. 

Apt si richiama da bash con il comando `apt-get` ma nelle ultime versoni è accettato anche `apt`. Ecco le istruzioni per l'aggiornamento del sistema:

```bash
sudo su
apt update        # legge l'elenco dei pacchetti da aggiornare
apt dist-upgrade  # aggiorna i pacchetti 
apt autoremove    # rimuove i pacchetti inutilizzati
exit 
```
o, in alternativa 

```bash
sudo apt update        # legge l'elenco dei pacchetti da aggiornare
sudo apt dist-upgrade  # aggiorna i pacchetti 
sudo apt autoremove    # rimuove i pacchetti inutilizzati
```


> E' possibile accedere alla documentazione di qualsiasi comando linux in 2 modi:  `comando --h` per l'help corto e `man comando` per visualizzare una sorta di manuale. ti consiglio di provali sul comando apt.

# configurazione di  ssh server

Vogliamo rendere più sicura e semplice la connessione remota `ssh` tramite l'accesso con l'utilizzo di un certificato anziché login e password.

Rispetto al PI, dove è installato per default, il pacchetto per `ssh server` potrebbe non essere installato su altri sistemi. in questo caso si procede con il comando sul server (PI)

```bash 
sudo apt install openssh-server
```

Continuerò negli esempi con  `p64` come server  con l'indirizzo `192.168.1.64` 

### sulla macchina client, il mac (quella da cui si fa il collegamento)

Creo una coppia di chiavi nella cartella nascosta .ssh

```bash
cd          # mi sposto nella root dell'utente
cd .ssh     # e nella sua sottocartella nascosta .ssh (il nome inizia con .)
ssh-keygen -t rsa -b 2048 -v -f rpi64 # creo un coppia di chiavi a cui assegno il nome rpi64 
sudo chmod 400 rpi64 # cambio gli attributi del file chiave: questo comando non è necessario nel mac, ma in un client linux è necessarion
```

con questo comando il sistema ha creato due files nella cartella che si possono vedere con ls -l
 
- `rpi64`: privato, da non condividere con nessuno, che abbiamo protetto dalla lettura con `chmod`
- `rpi64.pub`: da spostare sul server con **il comando successivo**. Non serve la copia in locale, ma preferisco tenerla.

Teoricamente si dovrebbe poter utilizzare la stessa coppia di certificati per diversi server, ma preferisco un certificato diverso
per ogni server.

```bash
ssh-copy-id -i rpi64.pub pi@192.168.1.64 # copia il certificato sul PI
```

verifico quindi sul server (dopo essermi collegato in remoto) che la chiave sia stata effettivamente copiata nella cartella ~/ssh

```bash
ssh pi@192.168.1.62
cd .ssh
cat authorized_keys # mostra il contenuto del file
```
quello che si vede nel file `authorized_keys` dovrebbe essere uguale al contenuto di `rpi54.pub`

nella cartella ~/.ssh del mac (client) modifichiamo il file **config** e impostiamo una shortcut per ssh (ottima per tutti i comandi, in particolare rsync e scp) 

```bash
Host p64
Hostname 192.168.1.64
User pi
IdentityFile ~/.ssh/rpi64
```

A questo punto programmi come rsync e scp (oltre a ssh) sono molto più semplici da gestire in quanto basterè indicare il nome del server seguito da : e folder per l'accesso a qualsiasi cartella.

Mi scollego dal pi e provo il nuovo sistema di collegamento:  e anzichè usare  `ssh pi@192.168.1.64` scrivo `ssh p64`: questo comando mi fa accedere direttamente senza login e password.

Per motivi di sicurezza, una volta verificato il funzionamento con certificato è meglio rimuovere la possibilità di accesso remoto con login e password. 

Questo si fa molto semplicemente sul server rimuovendo il commento della riga  **PasswordAuthentication** e impostandola a no.

```bash
sudo nano /etc/ssh/sshd_config # riga PasswordAuthentication no
sudo service ssh restart       # riavvia
```

