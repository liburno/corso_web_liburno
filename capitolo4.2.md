# Corso Web: ~4.2 Intermezzo: il formato markdown~ 

## il linguaggio ~MARKDOWN~

Markdown è un linguaggio di markup leggero che è possibile utilizzare per aggiungere la formattazione
elementi per documenti di testo in chiaro. Creato da *John Gruber* nel 2004, Markdown è
ora uno dei linguaggi di markup più famosi al mondo.

Nei nostri progetti utilizziamo una versione **'potenziata'** di markdown avendo aggiunto all'editor alcuni comandi (sotto indicati come non standard), cercando comunque di salvaguardarne lo spirito. Se si usa il nostro editor inoltre questa guida è a disposizione nel bottone in altro a destra.

L'uso di Markdown è diverso dall'uso di un editor *WYSIWYG*. In un'applicazione come
Microsoft Word, fai clic sui pulsanti per formattare parole e frasi e le modifiche
sono immediatamente visibili. Markdown non è così. Quando si crea un file formattato Markdown, si aggiunge la sintassi Markdown al testo per indicare quali parole e
le frasi dovrebbero apparire diverse.

Ad esempio, per indicare un'intestazione, aggiungi prima un segno numerico (ad esempio, # Intestazione
Uno). O per rendere una frase in grassetto, aggiungi due asterischi prima e dopo di essa (ad es. ** questo
il testo è in grassetto **). 

### Titoli:

per creare una intestazione a diverse grandezze usa il carattere **#** a inizio riga ripetuto fino a 5 volte. di seguito come viene tradotto il codice in elementi HTML

Markdown | Html
-|-
<pre> # livello 1</pre> | <h1>livello 1 </h1>
<pre> ## livello 2</pre> | <h2>livello 2 </h2>
<pre> ### livello 3</pre> | <h3>livello 3 </h3>
<pre> #### livello 4</pre> | <h4>livello 4 </h4>
<pre> ##### livello 5 </pre> | <h5>livello 5 </h5>
<pre>livello1<br>========</pre> | <h1>livello1</h1>
<pre>livello2<br>--------</pre> | <h2>livello2</h2>


le ultime righe riportano una sintassi alternativa **h1** e **h2** 

### Paragrafi:

per creare un paragrafo separato, basta lasciare una riga vuota:

```
questo è 
il primo paragrafo, e il contenuto va
sulla stessa riga

questo è il secondo paragrafo

per andare a capo senza creare un paragrafo:   
inserire due o più spazi alla fine 
(anche se non si vedono sono dopo ai due punti)
```

questo è 
il primo paragrafo, e il contenuto va
sulla stessa riga

questo è il secondo paragrafo

per andare a capo senza creare un paragrafo:   
inserire due o più spazi alla fine (anche se non si vedono sono dopo ai due punti)



### Enfasi e Grassetto:

Il testo può essere modificato in vari modi preponendo e postponendo alle parole un numero di **_** o __*__

Markdown | Html | Commenti
-|-|-
` *italico* o _italico_ `| il testo è *italico*
` **grassetto** o __grassetto__`| il testo è **grassetto**
` ***grassetto e italico*** `| il testo è ***grassetto e italico***
` **asterisks and _underscores_*` | **asterisks and _underscores_**
`~Colore Base~` | ~Colore Base~ | Non Standard!
`~~Colore Alternativo~~` | ~~Colore Alternativo~~ | Non Standard!
`~~~Cancella~~~` | ~~~Cancella~~~ | Non Standard!

&#96;codice&#96;  |      `codice`

## formule matematiche (Estensione non standard)

Se è installato il servizio sul sito, si possono scrivere formule matematiche utilizzando ***LaTex***, o un formato semplificato ***asciimath***, grazie a [MathJax](https://www.mathjax.org/) 

Si possono trovare diverse guide su internet tra cui questa [qui](https://www.youmath.it/come-scrivo-le-formule-matematiche.html), oppure in inglese questa per la sintassi AsciiMath che è un po' più semplice: [asciimath](http://asciimath.org/)

Markdown | Html
-|-
`$oint vec{F} cdot d vec{s}=oo$`|$oint vec{F} cdot d vec{s}=oo$
`$e^{x+4} + r^{\frac {x} {2} }$`| $e^{x+4} + r ^ {\frac {x} {2} }$
`$\sqrt[3]{x-w^{x}}`|$\sqrt[3]{x-w^{x}}$
`$\sum_{i=1}^{5000} 5^{i} $`|$\sum_{i=1}^{5000} 5^{i}$






### Liste:

Le liste possono essere create iniziano la riga con un numero seguito da . oppure con *
se si vuole accedere al secondo livello della lista mettere uno spazio all'inizio.

```
1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.

* Unordered list (* o + o - )
    * level 2
        * level 3
    * level 2 again
```
diventa:

1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.

* Unordered list (* o + o - )
    * level 2
        * level 3
    * level 2 again

### Citazioni

per una citazione iniziare la riga con >

> Questa è una frase attribuita a nessuno...
> ma ho spazio a sufficenza per riportarla


### tabelle 

Si possono inserire semplici tabelle in markdown ad esempio:


```
Voce | Persona | importo 
-|:-:|-:
Stipendio| Giuseppe | 1500
Spese | Mario | 300
```
La seconda riga determina che si tratta di una tabella, in quanto contiene sequenze di **-** e **|** il carattere **:** determina l'allineamento: nell'esempio la seconda colonna è centrale e l'ultima è a destra

Voce | Persona | importo 
-|:-:|-:
Stipendio| Giuseppe | 1500
Spese | Mario | 300

### immagini

Possono essere inseriti files o immagini. per farlo normalmente basta fare il drag da una posizione e viene scritto in automatico il codice Markdown :

* per inserire un riferimento HTML

```
[google ?](https://duckduckgo.com/)
```

[google ?](https://duckduckgo.com/)

* per inserire una immagine coscendo l'indirizzo:

```
![tux!](https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Tux_Enhanced.svg/154px-Tux_Enhanced.svg.png)
```

![tux!](https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Tux_Enhanced.svg/154px-Tux_Enhanced.svg.png)

* per inserire un video **YOUTUBE** il riconoscimento è automatico ma anche questa è una estensione non standard

```
![image](https://www.youtube.com/embed/tEvlmDb1jIw)
```
![image](https://www.youtube.com/embed/tEvlmDb1jIw)

### codice


L'aggiunta di codice in markdown con evidenziazione di sintassi (nel nostro sistema solo **javascript** e **bash**) avviene iniziando 3 rige con 

&#96;&#96;&#96;js   o &#96;&#96;&#96;bash 

... codice

&#96;&#96;&#96;


```js
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
```