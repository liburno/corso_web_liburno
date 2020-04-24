# 6.2 Creazione di un servizio WEB: analisi

L'installazione del server.js  vista nel capitolo precedente ha installato diverse cose "sottobanco":

* la gestione dei file statici nella cartella dist, che corrispondo al sito web vero e proprio, che al momento abbiamo limitato a un solo file `index.html`

* la gestione di alcuni servizi di autenticazione che hanno prefisso `auth` e che vedremo in seguito

* alcuni servizi di testi che vanno sotto il prefisso `birds` (il prefisso non significa nulla!). Partiamo da questi ultimi:

Assicuriamoci di aver avviato il server con il comando `node server` da terminale

Apriamo il file service.rest e scriviamo il codice per accedere ai servizi, sia in modo get che in modo post.

```js
post http://localhost:3000/birds/
content-type: application/json


###
get http://localhost:3000/birds/
content-type: application/json


###
post http://localhost:3000/birds/about
content-type: application/json

###
post http://localhost:3000/birds/counter
content-type: application/json

{
    "id":"3"
}
```

L'add on di visual code `rest client` permette di testare dei servizi post, rimandendo nell'ambiente `code`. Questo è utile nel nostro modo di progettare in quanto ci concentriamo su due diverse funzionalità separate:

* backend: dove scriviamo i servizi che ritornano oggetti JSON e che dialogano con database e file system della macchina server. 

* frontend: dove scriviamo il codice html/css/js del sito che comunicherà con il backend per ritrovare/memorizzare le informazioni. 

Tenere disgiunti backend e frontend è fondamentale per la manutenzione, la sicurezza del sito e per dare comunque ad altri la possibilità di accedere ai servizi senza front-end: virtualmente ci possono essere n frontend sullo stesso backend, e allo stesso modo il frontend può accedere ai servizi di più backend (con una limitazione attuale dovuta al sistema di autenticazione per cui mi dovrei autenticare su ogni backend dove fosse necessario 😞)

L'utility `rest-client` è un po' delicata: se non si scrivono le informazioni con la spaziatura richiesta non funzione e ritorna errore, però é facile impadronirsene:

* si inizia con `###` per indicare una nuova richesta
* nella riga successiva si dice se si vuole post o get e l'indirizzo completo
* nel caso di post con parametri, si lascia una riga bianca e tra parentesi graffe si inseriscono i parametri in formato `JSON`

il tasto `send request` appare automaticamente nel codice.

In questo esempio abbiamo messo servizi in post e in get, ma per il backend utilizzeremo solo post. 

premento per esempio il servizio `birds/counter` (l'ultimo della lista) otteniamo il seguente risultato:

```json
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Expose-Headers: Content-Length
X-Powered-By: Mia Nonna!
Content-Type: application/json; charset=utf-8
Content-Length: 79
ETag: W/"4f-hw/t1sd9RtkIiJX9Km/Qkw9GiMw"
Date: Fri, 24 Apr 2020 07:47:32 GMT
Connection: close

{
  "date": "2020-04-24T07:47:32.152Z",
  "time": 0,
  "data": " i= 3 , i*i =9 , i*i*i=27"
}

```

con il servizio `birds/` otteniamo: 

```json
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Expose-Headers: Content-Length
X-Powered-By: Mia Nonna!
Content-Type: application/json; charset=utf-8
Content-Length: 82
ETag: W/"52-NXxO88VALEkz6dn+fFuSgeW3Yx4"
Date: Fri, 24 Apr 2020 07:48:56 GMT
Connection: close

{
  "date": "2020-04-24T07:48:56.427Z",
  "time": 0,
  "data": null,
  "err": "mi va un errore 4"
}
```

Analizziamo il codice: 

Quello che vediamo fino alla riga `Connection: close` è l'header del servizio: a meno di non averne bisogno nella configurazione, non abbiamo bisogno normalmente di queste informazioni che gestiscono semplicemente il protocollo per l'invio delle informazioni. si veda per esempio `Content-Type` e `Content-Lenght` che dichiarano la modalità di ritorno delle informazioni (`JSON`) e la lunghezza in bytes del messaggio.

il messaggio vero è proprio è una struttura JSON, normalizzata dalla classe "Risposta". questa struttura riporta le seguenti informazioni:

* "date" : la data (del server) in cui è stato richiesto il servizio in formato ISO standard.
* "time" : il tempo impiegato dal server per elaborare il servizio in millisecondi.
* "msg" : non in questi messaggi, ma se presente indica dei warning rispetto al servizio stesso.
* "data" : se a buon fine, in questo campo vengono passate le informazioni del servizio in formato JSON: avremo bisogno solo di questo campo normalmente.
* "err" : in caso di errore, il servizio non si blocca ma torna un oggetto stringa in "err" (come vediamo nel secondo servizio): quanto `err` è presente, `data` è assente e viceversa.

Ora tutti i servizi che andremo a costruire con l'eccezione di quelli che non inviano JSON (esempio stream di video o immagini), avranno lo stesso formato e per questo nel capitolo successivo vedremo la struttura di un servizio un paio di servizi.


