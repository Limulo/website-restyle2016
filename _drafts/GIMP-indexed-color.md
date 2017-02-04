In GIMP è possibile lavorare, anche abbastanza agilmente, con il colore indicizzato.
Per una immagine che sia stata creata in questa modalità ad esempio, è possibile visualizzare la palette colori, in GIMP denominata MAPPA dei colori.

Per farlo basta selezionare 'Mappa colore' dal menù a tendina 'Finestra/Pannelli agganciabili'.

Da questa finestra è poi possibile riordinare i colori della palette in modo abbastanza semplice.
Una cosa molto interessante è ad esempio la possibilità di ordinare i colori manualmente con il semplice drag e drop per effettuare il riposizionamento.


Ci sono però alcuni bug, ad esempio l'aggiunta in palette del colore di foreground non si comporta sempre nella maniera corretta.
Il rischio è poi di operare su qualcosa che non è poi il risultato visivo reale.

Non ho ancora capito come sia possibile rimuovere i colori dalla mappa colori una volta che (magari erroneamente) essi sono stati inseriti.
Per ora l'unica via sembra essere il Mela+Z, a patto di accorgersi subito dell'errore.

Ad ogni modo ecco qui di seguito alcuni link che mostrano come lavorare indicizzato in GIMP:
http://docs.gimp.org/2.8/it/gimp-indexed-palette-dialog.html
http://docs.gimp.org/2.8/it/plug-in-colormap-remap.html

In Aseprite è possibile fare lo stesso.
Data una immagine indicizzata è possibile ordinare un range di colori per
- Hue
- Saturation
- Brightness
A riordinamento avvenuto, la preview può trarre in inganno perchè mostra l'immagine indicizzata con colori sballati.
Se poi però si clicca sul pulsante 'REMAP' i pixel che prima avevano un indice e che ora appaiono colorati con tonalità sballate,
con remap si ricolorano del loro colore originario perchè tutti i pixels aggiornano il proprio indice inseguendo la posizione del loro vecchio colore nella nuova palette riorganizzata.
