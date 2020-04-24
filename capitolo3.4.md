
# Corso Web: ~3.4 intermezzo: comandi da terminale~ 

In questo capitolo facciamo una parentesi sui comandi che possono essere utilizzati da terminale. 

Con la presenza dominante delle interfacce grafiche il terminale viene spesso ignorato ma va comunque ricordata l'importanza e la potenza di questo strumento.

Lavorare con la bash migliora la comprensione di tutto il sistema e consente spesso un accesso dove difficilmente si avrebbero le stesse possibilità dall'interfaccia grafica. Linux e Mac (che utilizza le stesse funzioni) e ultimamente anche windows, mettono a disposizione la Shell terminale `BASH` (Bourne again Shell) o `ZSH`. Al di la di piccole differenze il set di comandi di entrambe è enorme, e consentono di dialogare al meglio col sistema operativo.

Si possono creare facilmente script per task ripetitivi da eseguire a tempo, al riavvio (`crontab`) o quando serve.

Si può accedere a tutte le funzionalità della macchina comprese quelle a più basso livello, fare aggiornamenti (`apt`) monitorare lo stato del pc (`htop`) consultare la documentazione (`man`). L'elenco è infinito, e in questo capitolo ci occuperemo solo di alcuni comandi base. per il resto vi sono libri sulla bash:

- [la guida completa](https://libri.liburno.com/libri/tecnici/linux/Guida%20avanzata%20di%20scripting%20BASH.pdf) di Mendel Cooper, probabilmente testo definitivo, di 800 pagine circa.
- Le pagine wiki su [bash](https://it.wikipedia.org/wiki/Bash) e [zsh](https://it.wikipedia.org/wiki/Zsh) che fanno un po' di storia su questi strumenti.
- Una dei tanti corsi di base sul sito [HTML.IT](https://www.html.it/pag/71479/il-bash-scripting/)


Occorre precisare che bash e zsh sono strumenti piuttosto "antichi" (1990) e derivano da strumenti ancora precedenti (anni '70). Questo non significa che siano superati, e non lo sono senz'altro per i comandi di base, ma per gli script più complessi oggi vi sono metodi strumenti di sviluppo più semplici, come  `Python` o applicazioni  `nodejs CLI` che affronteremo più avanti.

Per evitare confusione da qui in poi parleremo di bash, sottointendendo anche zsh

Bash è un’interfaccia a riga di comando avanzata, che dispone di alcune funzionalità molto utili ad esempio l'auto-completion: è possibile ottenere dei suggerimenti durante la digitazione in modo che non sia necessario digitare interamente i comandi che vogliamo eseguire; basta digitare alcune lettere e poi premere il tasto Tab per ottenere un elenco di possibili comandi che vogliamo utilizzare, o per navigare tra le cartelle.


Un'altra cosa importante è che permette di mantenere una History dei comandi digitati precedentemente: spesso quando si lavora direttamente con l'interfaccia riga di comando sia la necessità di digitare più volte gli stessi comandi e a volte si tratta di comandi molto lunghi, quindi poterli “ripescare” facilmente nella History sicuramente è molto utile.

 In fase di amministrazione la History si può richiamare con i tasti freccia su e freccia giù della tastiera e di fatto viene salvata in un file `~.bash_history`.

Inoltre si tratta di un prompt che consente di eseguire più comandi contemporaneamente sia in modo sequenziale quindi uno dopo l'altro, sia in modo concorrente.

### Utilizzo di base della riga di comando

Per molti, l'interfaccia della riga di comando è qualcosa vista con molta paura e avversione. Sembra qualcosa che solo quelli con una laurea in informatica dovrebbero prendere in considerazione. Tuttavia, l'interfaccia a riga di comando (o CLI) è uno strumento estremamente potente. Le competenze CLI possono accelerare il flusso di lavoro. 

Inoltre molti strumenti non disponibili sull'interfaccia grafica di un computer sono disponibili nella CLI.

Sebbene ci sia un po 'di verità sul fatto che si possa fare un grave danno a un computer immettendo incautamente comandi, è molto utile conoscere la riga di comando. Per prima cosa, se si utilizza un sistema operativo simile a Unix (come un computer Mac o Linux), la maggior parte di questi comandi sarà universale. Inoltre, praticamente tutti i server web esistenti usano un po 'di sapore di Linux, quindi anche questi comandi si applicheranno lì. Sapere come lavorare con un server dalla riga di comando è spesso un prerequisito di base per eseguire qualsiasi tipo di sviluppo back-end.

Ecco i comandi più comuni:

### ls - Elenca i file

È possibile utilizzare ls per elencare i file nella directory corrente (cartella) in cui ci si trova.

Sono disponibili alcune opzioni per modificare le informazioni visualizzate. Ciò è possibile aggiungendo i "flag" opzionali del comando.

Se si digita ls -a, verranno visualizzati TUTTI i file in una directory corrente, anche i file nascosti come i file dot.

Digitando ls -l verrà visualizzato l'elenco in formato lungo. Ulteriori informazioni includono la data di creazione, la modifica della data, le autorizzazioni di lettura / scrittura, le dimensioni del file, ecc.

Digitando ls -t verranno ordinati i file nella directory in base alla data dell'ultima modifica e ls -S ordinerà i file in base alla dimensione del file.

### cd .. - Cambia directory

Per cambiare directory, è sufficiente digitare cd seguito dal percorso che si sta tentando di navigare. Ad esempio, per salire di una directory dalla posizione attuale, digitare cd ..

.. è il simbolo universale per salire di una directory. Ad esempio, se il percorso del file è "Desktop / directory1 / directory2", digitare cd ... Per tornare al desktop da directory2, digitare cd ../ ..

Gli esempi sopra utilizzano percorsi relativi. Questa è la relazione della directory di destinazione con la directory corrente. Tuttavia, puoi anche navigare utilizzando il percorso completo. Per accedere a Desktop da qualsiasi directory, digita semplicemente cd Desktop.

### mkdir

Per creare una nuova directory, digitare `mkdir directoryname`, dove "directoryname" è il nome della cartella che si desidera creare. Questo creerà una nuova directory vuota ovunque ti trovi attualmente.
rmdir

Allo stesso modo, per rimuovere una directory, dovresti solo digitare rmdir "directoryname".

### touch

touch è un comando che puoi usare per creare un nuovo file vuoto, senza contenuto o tipo di file. Ad esempio, toccare newfile creerà semplicemente un nuovo file vuoto denominato newfile. Se applicato a un file esistente ne cambia la data di ultima modifica


### rm - cancellazione file e cartelle

È possibile rimuovere i file o le cartella  digitando rm <nomefile>.

È inoltre possibile rimuovere tutti i file in una directory corrente aggiungendo un asterisco al comando, ad esempio rm `*.`

Se si desidera rimuovere una cartella, comprese tutte le sottodirectory e i file all'interno, è necessario utilizzare l'opzione ricorsiva-r, ad esempio rm -r mydirectory.


Bisogna stare molto attenti con il comando rm, poiché non è reversibile. È diverso dall'eliminazione di un file e dal suo utilizzo nel cestino prima dell'eliminazione definitiva. Una volta rimosso un file viene rimosso con il comando rm, è completamente sparito.



### cp - copia files

Per copiare un file, puoi farlo digitando cp <nomefile> <nomefile2>. Questo copierà <nomefile> in un nuovo file, <nomefile2>.

È inoltre possibile utilizzare questo comando per copiare una directory. Sarà necessario utilizzare il flag ricorsivo -r per copiare anche tutti i file e le sottodirectory. Ad esempio, cp -r <directory1> <directory2>.


### mv - sposta file e directories


Per spostare un file o una directory, utilizzare il comando mv. Digitando il comando mv <nomefile> .. si sposta <nomefile> in una directory.

È inoltre possibile utilizzare questo comando per rinominare un file. Simile a cp, digitare mv <nomefile> <nomefile2>. L'unica differenza qui è che rinomina solo il singolo file, invece di crearne una copia.

### nano - editor

Nano è un editor di testo preinstallato con la maggior parte dei sistemi simili a Unix. Per aprire un file di testo che direttamente sulla riga di comando, digita semplicemente nano <nomefile>.

Allego il riferimento per una breve guida all'utilizzo dell'editor : [guida](https://www.howtogeek.com/howto/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/)

### Altri comandi

- `crontab`: È l'utility che permette di configurare le operazioni da avviare a tempo, o al riavvio del sistema.

- `sudo`: Esegue i comandi in modalità supervisore. 

- `htop`: avvia un monitor con lo stato delle risorse del sistema, aggiornato in tempo reale.

- `ps`: mostra l'elenco dei processi attivi

- `cat (nomefile)`: mostra il contenuto di un file

- `pkill` o `kill`: cancella un processo

- `ifconfig` : mostra lo stato della rete

- `curl` : browser testo di linux

- `pwd` : mostra la cartella corrente

- `df -h`: visualizza lo spazio libero su disco

- `free -h`: visualizza lo stato della memoria

- `sudo lshw -short `: dispositivi hardware del sistema

- `uname -a` : nome del sistema e informazioni varie.

- `sudo nast -m`: mappa dispositivi connessi alla rete linux (richiede installazione con `sudo apt-get install nast` )


# comandi per la gestione remota

Abbiamo visto che possiamo collegarci a un server remoto con il comando ssh, ma vi sono due comandi particolarmente importanti che utilizzeremo per sincronizzare i files da e verso una macchina remota:

### scp - Copia remota.

Il comando scp funziona in modo analogo al comando cp, ma accetta come path anche una macchina remota: è possibile ad esempio copiare file.txt sulla macchina r65 con il comando

```bash
scp ~/file.txt r65:~/dati/file1.txt   # copia da locale su r65 
scp r65:~/dati/file1.txt ~/file2.txt  # copia da r65 a locale
```

### rsync - sincronizzazione remota di file o cartelle.

Il comando rsync permette di sincronizzare 2 cartelle tra macchina locale e remota e viceversa. la sincronizzazione è diversa dalla copia in quanto vengono trasferite solo le variazioni. nella sincronizzazione possono essere anche cancellati files. 


# conclusioni sui comandi.


L'elenco dei comandi è veramente lungo, ed è difficile essere esaustivi. Ricordiamo in modo particolare il comando `man` che premesso a ogni comando mostra una descrizione esaustiva del suo funzionamento, anche perchè è veramente difficile ricordare ogni singolo parametro di ogni singolo programma


```bash
man ls
```
Ogni comando inoltre normalmente ha dei flag convenzionali:
* `- v`: mostra ls versione corrente del programma
* `-h` o `--help`: mostrano un help semplificato sul loro funzionamento.

se un programma manca normalmente può essere installato dal repository di linux tramite `apt-get`. per i sistemi MacOs si può analogamente installare softare da riga di comando con `brew`, anche se non uso spesso questa opzione visti gli strumenti messi a disposizione dall'interfaccia grafica.


Procedendo nel corso vedremo probabilmente altri comandi. E' importante padroneggiare i concetti base della shell, e mettere nel proprio bagaglio di informazioni i comandi che si utilizzano più spesso.

### accesso al terminale

da MacOs l'accesso al terminale viene fatto cliccando sulla corrispondete icona, ma più spesso vado a utilizzare il terminale integrato all'editor di `code`. Si possono creare facilmente nuove istanze (finestre) con il tasto `command+n`
per accedervi è sufficente la sequenza di tasti **control+`**. da qui si possono aprire contemporaneamene più finestre tra cui ci si può agevolmente muovere.




