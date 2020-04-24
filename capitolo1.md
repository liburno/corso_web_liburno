# Corso WEB: ~1. Introduzione~ 



Lo scopo di questo corso è quello di dare un quadro completo su un modello di sviluppo di applicazioni web frutto degli studi da me fatti,  sia a livello professionale che personale negli ultimi 4 anni.

Ho cominciato a programmare 40 anni fa, con strumenti come il Basic, l'assembler 8086, il Pascal, il C, per passare col tempo a linguaggi diversi. 

A livello professionale ho utilizzato il C/C++ per creare le librerie di base, e il Visual Basic prima e C# poi per le interfacce. 

Sviluppando applicazioni grafiche e gestionali 3D ho lavorato con SQL Server, OpenGL e  DirectX. Tutto in ambito Windows. 

Circa 8 anni fa, ho cominciato ad approciare la scrittura di applicazioni web. Conoscevo ovviamente HTML, anche se non lo utilizzavo spesso javascript, ma li avevo sempre visti come strumenti per creare siti web, non applicazioni: una applicazione non è una cosa statica, può dover eseguire elaborazioni complesse e mostrare gli output dinamicamente, siano essi in formato testuale o grafico 2D o 3D. In particolare prima della nascita di WebGL, pensavo che il mondo web fosse precluso alle applicazioni Cad, e quindi, a livello professionale, ho seguito strade diverse all'epoca piú promettenti.

Poi ho visto nascere diversi frameworks:

- `nodejs`: tuttora il prodotto più importante per lo sviluppo di un server WEB
- `angularjs` che con il tempo ho sostituito con `VueJs`
- `webgl`, che non userò comunque in questo tutorial, ma che permette di gestire applicazioni con grafica 3D evoluta sul web.

Sono passati diversi anni in cui costantemente ho via via provato nuovi framework, da `bootstrap` a `material`, da `angular1.0` a `angular2` a `vuejs` ... provando un po' tutto quello che mi passava tra le mani, e non sempre con risultati ideali, ma con la convinzione che quella del web fosse la strada giusta.

Con la mia azienda abbiamo realizzato il primo prodotto web complesso: un Cad 3D, per la gestione degli ordini di mobili, collegato a negozi ecc.
Questo è tuttora un prodotto in commercio ed è un prodotto di successo, anche se oggi non faccio più parte dell'azienda che lo gestisce. 

Quando ho chiuso con la mia ex azienda, non ho voluto comunque chiudere con la programmazione, ma ho affrontato piuttosto un tema che non ero a suo tempo riuscito a gestire. 

### Potevo liberarmi di Windows?. 

Per tanti anni avevo scritto programmi, e per motivi di compatibilità nello scrivere nuove versioni non avevo mai potuto cambiare quella che era la base da cui ero partito: `Windows`

Dover buttare via tutto e ricominciare da capo non era cosa fattibile in una azienda dove vecchi e nuovi prodotti dovevano convivere e essere il più possibile tra di loro integrati. Troppi scogli, script creati in VBscript, Database SQL Server, pezzi di programma in VisualBasic, integrazioni con Microsoft Office....

Avevo comunque l'occasione di cambiare tutto e cosí ho fatto. Vorrei dire che è stato semplice, ma purtroppo sono sempre stato un pignolo perfezionista, e quindi ho dovuto provare n volte prima di convincermi di una soluzione rispetto a un'altro.

Alla fine penso di essere riuscito a trovare la mia strada. Beninteso, non è mia nel senso che ho inventato qualcosa, ma ho preso tante cose esistenti, le ho messe insieme e il risultato è un modo di lavorare che oggi mi soddifa.

### e adesso...

Vorrei quindi, anzichè ripercorrere la strada con tutti gli errori fatti, passare a illustrare direttamente il modello e le soluzioni che ho trovato, hardware e software, le librerie e esempi da zero che permettono di replicare il modello che oggi sto utilizzando.


### Cosa serve sapere. 

Ovviamente, per capire il contenuto di questo corso servono alcune conoscenze di base. Prima di tutto `Javascript` o meglio `es6`: questo è il linguaggio principale del web ed è anche il linguaggio al centro di questo corso. 

Va da se che serve avere anche una base di `HTML` e `CSS`.

Per ultima chiedo una certa familiarità con l'interfaccia non grafica da `terminale` anche se per questo, nel corso ho previsto un capitolo per illustrare i comandi principali.

Nella prima parte ci concentriamo sugli strumenti di base, come configurare macchine e server e come avere un sito web funzionante.


Nella seconda vorrei dare vita ad alcuni progetti, anche per cose diverse. 

- Creare dei servizi web che rispondano alle richieste in formato JSON. 
- Attivare queste richieste con programmi CLI scritti in node 
- Creare un progetto web con VUE per la gestione di un Database di articolo 
- Creare un gioco con una libreria grafica 2D.
...

Propongo di usare un MAC come sistema di sviluppo, ma anche in Windows ci sono gli stessi strumenti. E' consigliato un buon collegamento al web.  
Alcune cose inoltre, andrebbero acquistate e viste come un investimento per la conoscenza:

- un raspberry p3, con alimentatore e cavi per meno di 50€
- un dns per I propri progetti, per circa 10€ all'anno, da la possibilità di avere un proprio indirizzo pubblico personalizzato per tutti i vostri progetti/siti.
- un server remoto linux. la soluzione che propongo con AWS è gratuita per il primo anno e poi i costi, in base alla dimensione dei progetti vanno da 7€ al mese in su. Se non lo si usa lo si può comunque chiudere.

Tutto il resto è reperibile su web in forma gratuita. Per la registrazione in alcuni siti, serve indicare una mail valida, un numero di cellulare e una carta di credito.

Ho registrato il mio account privato su GitHub per circa 7€ anno, e consiglio di farlo quando si comincia a lavorare in modo "professionale", ma non è necessario.
