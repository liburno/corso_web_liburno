# Corso WEB: ~2. Hardware~ 

### MacBook Pro con OS Catalina

Ho comprato un MacBook solo 2 mesi fa. Ho sempre avuto la convinzione che il mac fosse un prodotto un po' di nicchia, per *fighetti*, o comunque designer, ma non adatto a un programmatore "serio" come penso di essere.

Mi sbagliavo! Completamente! 

Precedentemente usavo un paio di PC su cui avevo installato Ubuntu Desktop. Questa versione non è male, ma si capisce subito, per chi arriva da Windows, che l'interfaccia grafica è come un passo indietro e, più di una volta, ho rimpianto Windows. La disponibilità di software desktop è finire, in genere con prodotti molto complessi, o con evidenti carenze.

Amo linux, ma non la sua interfaccia grafica.

Avevo dotato questi PC di monitor esterno, mouse esterno e normalmente li sfruttavo solo come "desktop" per cui mi spostavo con cavi hdm, mouse... 

Il mac ha una grande disponibilità di software desktop, integra già una suite office di qualità e sono disponibili i migliori pacchetti grafici in circolazione, per manutenzione di video e immagini.

il mio Mac non è recentissimo: è un modello del 2014 con 16GB ram e 256GB di disco, e processore I7 con un monitor è da 15" che ho comprato come ricondizionato con un costo di circa 1000€
 
Nel Mac tutto, il monitor, la tastiera, le casse la telecamera integrata e soprattutto la multitouch trackpad sono eccellenti. la trackpad è realmente funzionale e **rende obsoleto il mouse esterno**: in windows non sono mai riuscito a utilizzare la trackpad dei notebook in modo efficiente per cui collegavo sempre un mouse esterno. Questo non è necessario col mac che offre strumenti interessantissimi e molto pratici con il multitouch. 

Il desktop è estremamente funzionale, il tasto in più `command` da una marcia in più alle shortcut. Consiglio per la programmazione il layout di tastiera inglese.

Per finire la shell, ossia il terminale. MacOs non utilizza bash ma zsh che é comunque compatibile con la bash di linux, e non la vecchia Shell del dos che viene fornita come standard in Windows. 

I comandi da terminale sono gli stessi di linux e lavorare da terminale con il mac è a tutti gli effetti equivalente a lavorare con un sistema linux.

### Raspberri PI con Raspbian Lite.

La mia architettura prevede di lavorare con diversi server LINUX. 

Un server linux non ha normalmente installata l'interfaccia grafica (non ne ha bisogno, e consuma solo uno sproposito di risorse!) ma solo quella terminale da cui si accede con 'ssh'. Qualsiasi macchina Linux è equivalente, ma tra tutte preferisco il Raspberry per i seguenti motivi:

- il costo: da 12€ (Raspberry 0) 30€ (Raspberry3) e 50€ (Raspberry4). Aggiungendo una scheda SSD da 16/32 GB si ottiene un server completo, e che ha bisogno di poca o nessuna manutenzione.

- l'affidabilità: una volta acceso lo si può dimenticare (ne ho alcuni accesi da più di un anno). anche se si interrompe la corrente è in grado di ripartire senza problemi. Non ha parti in movimento, non scalda, consuma poco ed è sempre disponibile.

- anche se è "piccolo" la configurazione con 1GB di Ram e 16SSD è perfetta per un server. Se non è installata l'interfaccia desktop linux non abbisogna di tante risorse. Utilizzando il comando HTOP il consumo di RAM monitorato per il sistema è di circa 100Mb, lasciando 900Mb per le applicazioni che sono un bel po' per una applicazione Node. La scheda SSD, se non si devono memorizzare video o immagini in HQ per le quali è molto più semplice integrare piattaforme esistenti (YouTube) 

- la facilità di installazione: una volta seguiti i passi che descriverò successivamente per l'installazione di una macchina, basta duplicare la scheda SSD per ottenere un'altra macchina. Cambiati nome e indirizzo IP si può avere un nuovo server.

In ogni caso se si dispone di un vecchio PC o notebook, su cui magari windows arranca, consiglio di riciclarlo come server Linux. Questa strada è una buona alternativa a quella della Raspi. L'installazione di Ubuntu non è particolarmente difficile, e si trovano diverse guide. Ho acquistato dei vecchi notebook per 200€, e sono dei server perfetti.



### AWS 

Amazon Web Service: questa piattaforma di Amazon, fornisce la migliore e più economica macchina linux per un server. 

- Per la configurazione tiny, è gratis per un anno e successivamente costa circa 7€ al mese a consumo. La configurazione tiny prevede 1GB di Ram e 30GB di Hard Disk ed è quindi paragonabile al Raspberry 3. Ho utilizzato una configurazione di questo tipo per ospitare fino a 30 server Node sulla stessa macchina, senza particolari problemi di performance.

- Aws garantisce una facile scalabilità per cui se il traffico dovesse aumentare è possibile scalare dinamicamente la macchina in ogni sua parte ram, disco, velocità di trasferimento dei dati. 

- il backup può essere automatico.

### considerazioni finali.

Se siamo abituati a Windows, potremo essere portati a pensare che le configurazioni hardware, soprattutto per i server siano troppo "piccole". Windows con meno di 4GB non funziona, e se installiamo SQL server dobbiamo arrivare almeno a 16GB e utilizzare una architettura a diversi Core per garantire le prestazioni.

Voglio solo dire che nel modello che andiamo a proporre tutto questo non è necessario: il sistema operativo "consuma" solo 100Mb, e Linux non è sicuramente meno performante di Windows, soprattutto come server web. La maggior parte dei server Web nel mondo sono basati su architettura Linux.

Il database che andremo a utilizzare `SQLLite` oltre a non richiedere installazione non ha necessità di grandi risorse per il suo funzionamento. Potrebbe lasciare perplessi la scelta di un database di questo tipo, ma ne parleremo nel capitolo dedicato.

NodeJS è leggero ed estremamente performante. Il consumo di memoria e di CPU di una applicazione è minimo. Su una macchina dove ho installato 20 Server Web express, ho rilevato con `htop` un utilizzo totale (compreso il sistema operativo) di 480MB di ram.

Node+nginx sono estremamente performanti e non impegnano troppo la CPU, e anche se è difficile stimare l'occupazione di CPU ho creato delle applicazioni che simulavano alcune centinaia di richieste al secondo senza mai portare al limite 1 solo processore. Mi fa ridere che in questi giorni un sito pubblico molto importante sia andato in tilt perchè aveva raggiunto qualche centinaio di richieste al secondo. Col modello di scalabilità che vedremo questo volume di richieste può essere soddisfatto da macchine molto piccole.

Ovviamente ci sono servizi più impegnativi di altri, ma il modello da me usato, comparato sopratutto ad altri server web come Apache+PHP+Oracle o IIS+SqlServer,  è sicuramente molto più performante.

### Software libero.

Tutto il software installato e utilizzato è libero: con l'esclusione del MacOs che è installato sulla macchina, Da `linux` a `nodejs` a `nginx` tutto quello che utilizziamo è liberamente scaricabile da WEB. 

Rispetto a qualche anno fa (10/20...) il software libero è in molti casi migliore di quello a pagamento, viene manutenzionato da comunità e non da grandi aziende come Microsoft, Google ... per cui lo preferisco. Inoltre i progetti tendono a dare continuità: vi è sempre una comunità attenta alle incompatibilità tra le versioni, tra colpi di mano come quelli a cui mi aveva abituato in passato Microsoft che poteva liberamente decidere l'obsolescenza di un prodotto rispetto a una nuova versione, costringendo alla fine gli sviluppatori a ripartire da capo ogni tot.

Per il software libero é virtualmente impossibile per qualsiasi grande azienda impossessarsene: mi viene in mente l'esempio di qualche anno fa di mysql passato sotto il controllo di Oracle, che all'inizio dichiarava di non volerne cambiare le politiche ma di fatto lo ha stravolto! 

Poco male, la comunità é passata a un suo `fork`, (progetto a partire da una copia completa) che sta manutenzionando con notevole successo: si parla ancora di my-sql, ma si installa `maria-db`



