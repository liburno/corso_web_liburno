# corso web: ~5.1 Intermezzo. git+GitHub~

In questo capitolo vedremo come salvare il nostro progetto test su GitHub. Tramite git questo consentirà di gestire tutta la cronistoria delle variazioni, ci permetterà di far intervenire in modo sicuro altri sviluppatori e, per finire, se avessimo bisogno di utilizzare i sorgenti su un pc diverso ci permetterà di clonare il progetto facilmente.

# i comandi GIT. 

Si può accedere ai comandi git da terminale, e qui do una breve lista dei comandi git da me più utilizzati:

Per iniziare i comandi di configurazione: questi vanno eseguiti la prima volta e permettono di identificarci su tutti i progetti che avremo nel mac

```bash
git config --global user.name "name"
git config --global user.email "email@name.mm"
```

Passiamo ora alla cartella test, dove inizializzeremo la cartella con git. Prima di farlo ritengo utile creare nel progetto un file `.gitignore` dove posso istruire git su cosa non inserire negli aggiornamenti (in particolare è importante ignorare la cartella `node_modules` che è molto pesante. questo è il mio default. 

```bash
node_modules
dist
data/*
!data/*.md
*.json
!package.json
olds
```

> Sto dicendo a git che non deve considerare le cartelle node_modules,dist,data e olds , ma che deve accettare i files .md contenuti in data (eccezione). non deve considerare alcun file JSON nella cartella principale tranne `package.json` (eccezione). Nella cartella `olds` normalmente metto le cose che non mi servono e non voglio gestire. 

> Ho escluso anche la cartella `dist` perché nei progetti successivi sarà autogenerata. in questo momento però tolgo l'esclusione.

A questo punto passo al terminale con i comandi:

```bash
cd ~/sites/test
git init            # inizializza git per questo progetto
git add *           # aggiunge i files 
git commit -m "first commit" # crea il primo reposity locale, 
```

### alcuni comandi secondari:

se si modificano files è bene usare il comando di status per visualizzare le modifiche 

```bash
git status
```

per salvare le modifiche nella stash area 

```bash
git add <nomefile>
git add *
git rm  <file>                # rimuove un file
gti mv  <fileorg> <filedest>  # rinomina un file
```

per eseguire il commit:

```bash
git commit -m "<descrizione>"
git commit -a -m "<descrizione>"  # fa anche l'add ma non funziona con nuovi file o cancellati
git commit --amend -m"<des>"      # aggiorna l'ultimo commit con eventuali dimenticanze 
```

per avere una lista di tutti i commit si usa il comando log

```bash
git log 
git log --oneline
git log --oneline --all --graph
git log --since=2.weeks               # solo ultime 2 settimane
```
è importante con questo comando vedere dove c'è la "head" ossia la versione corrente, e l'elencod di tutti i nomi assegnati ai branch

per creare un branch :

```bash
git branch <name>            # imposta un branch sull'elemento corrente
git branch <name> <id>       # imposta un branch sull'elemeto id
git branch <name> -d         # cancella il branch
git branch                   # da l'elenco dei branch
```

per leggere una versione dal repository (sostituisce quella corrente),
se si sono fatti cambiamenti alla versione corrente non permette il checkout: fare commit o usare il parametro -f

```bash
git checkout <id>  # imposta un branch sull'elemento corrente
git checkout <branch>
git checkout <branch> -f
git checkout <branch> file  # questo non sposta la head ma prende il singolo file dal branch/id
```

e per finire il comando per unire due branch

```bash
git checkout master      # carica il master
git merge test           # merge con il branch test
# se ci sono confitti vanno risolti file per file: attenzione VCode ha una gestione automatica
# ma prima del commit richiede un nuovo add
# 
git branch test -d       # a questo punto si può cancellare il branch test
```

# Comandi remoti


Da una copia locale di git è possibile collegare un repository remoto.
Si possono avere diversi collegamenti remoti, legati a diverse keywords, quella di default è 'origin', ma è solo convenzionale. 

di seguito una breve lista di comandi:

```bash
git remote -v                     # per visualizzare i files connessi
git remote add origin <percorso>  # per aggiungere un nuovo percorso, nella forma https://<user>@git.xxx.xx/nome.git
git remote remove origin          # per rimuovere

```
l'update del server remoto avviene con il comando


```bash
git pull <origin> <id / branch>     
git pull --rebase --verbose origin master legge i dati da remoto e forza  

```


# Comandi remoti: test

Accediamo a GitHub dove ci siamo registrati precedentemente e creiamo un nuovo repository con il nome del progetto ('test')

![img|80%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00008.jpeg)

Una volta creato verranno presentate le istruzioni per clonare (che non usiamo) o applicare a un progetto esistente.

![img|80%|block mx-auto](https://images.croswil.com/public/@my/corso/jpeg/00009.jpeg)

applichiamo da riga di comando le istruzioni:

```bash
cd ~/sites/test
git remote add origin https://github.com/tergeste/test.git
git config credential.helper store # evita di chiedere ogni volta login e password
git push -u origin master
```

se torniamo su GitHub  e dovremo vedere tutti i files pubblicati. Da questo punto possiamo continuare a gestire le versioni git direttamente con `code` integrato.


