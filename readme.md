#### Liber Primus Translator ####
___

A toolset for working with 3301's Liber Primus.

#### Quick start ####
___

Clone and run the repository to translate the first segment of Liber Primus.

```bash
$ git clone https://github.com/rtkd/idkfa .
$ npm install
$ chmod u+x idkfa
$ ./idkfa -s 0.0 -v l -i l
```

#### Available Commands ####
___

##### -c, --charAt #####

Returns latin character(s) at position(s) n.

```bash
-c 0 1 2 3
```

##### -f, --find #####

Finds crib candidates and returns source, source path and key

```bash
-f the circumference
```

##### -i, --invert #####

Inverts/Reverses source, gematria and key properties

```bash
-i f
```

  * **f** — Invert gematria row: futhark
  * **k** — Invert key
  * **l** — Invert gematria row: latin
  * **o** — Invert gematria row: offset
  * **p** — Invert gematria row: prime
  * **s** — Reverse shift
  * **t** — Reverse source text

##### -k, --key #####

Generates and applies key(s) for decryption.
Keys can be denoted as `integer`, `integer csv`, `latin`, `futhark` or `mathematical expression`. Multiple keys are seperated by a space.

For details on using mathematical expressions see: [MathJS Functions](http://mathjs.org/docs/reference/functions.html)

**Expressions must be enclosed in single quotation marks.**

Function `primes()` will accept 0, 1 or 2 parameters of type `integer`
.
  
  * 0 parameters will generate as many consecutive primes as the selected source has graphs.
  * 1 parameter will generate first n consecutive primes, and repeat as source has graphs.
  * 2 parameters will generate consecutive primes from n to n, and repeat as source has graphs.

If first parameter is larger than second, order of primes will be reversed.

##### Examples #####

Generate key: 1,1,1,1..
```bash
-k 1
```

Generate key: 1,2,3,1,2,3..
```bash
-k 1,2,3
```

Generate key: 23,10,1,10,9,10,16,26,23,10,1,10,9,10,16,26..
```bash
-k divinity
```

Generate key: 0,3,3,17,24,4,0,3,3,17,24,4..
```bash
-k ᚠᚩᚩᛒᚪᚱ
```

Generate key: 1,2,4,6,10,12,16,18,22,28,30,36..
```bash
-k '$(ephi(x), x, primes())'
```

Generate key: 29,23,19,17,13,11,7,5,29,23,19,17,13,11,7,5..
```bash
-k '$(x, x, primes(10, 2))'
```
Generate keys: 1,2,3,1,2,3.. **and** 23,10,1,10,9,10,16,26,23,10,1,10,9,10,16,26..
```bash
-k 1,2,3 divinity
```

##### -p, --patch #####

  *	**d** — Patch the dictionary to match expected output ((I)NG, I(A/O)..)
  *	**s** — Patch chars at specific positions within source. (See config.js)

```bash
-p s
```

##### -s, --source #####

Select part(s) of source.
Source accepts one or multiple *paths*, each consisting of one or multiple *waypoints*, seperated by a dot.
Each waypoint denotes an offset within the hierarchical source array.

```bash
-s 0.0
```	
##### Examples #####

Select chapter 0
```bash
-s 0
```

Select section 12 of chapter 0
```bash
-s 0.12
```

Select paragraph 1 of section 13 of chapter 0
```bash
-s 0.13.1
```

Select sentence 1 of paragraph 0 of section 11 of chapter 0
```bash
-s 0.11.0.1
```

Select word 5 of sentence 4 of paragraph 0 of section 11 of chapter 0
```bash
-s 0.11.0.4.5
```

Select graph 1 of word 5 of sentence 4 of paragraph 0 of section 11 of chapter 0
```bash
-s 0.11.0.4.5.1
```


##### -v, --verbose #####

Sets the data to return.

```bash
-v c w x
```

  *	**c** — The char (graph) count of the selected source.

  *	**d** — Matches generated latin against a dictionary and returns longest and most matched words.

  *	**f** — The generated latin as futhark.

  *	**i** — The Index of Coincidence for the given source.

  *	**k** — The generated key(s).

  *	**l** — The generated latin text.

  *	**p** — The generated text as primes.

  *	**s** — The selected source

  *	**w** — The word count of the selected source.

  *	**x** — The checksum (sum of gemartia prime values) of the selected source.

##### -w, --wordAt #####

Returns latin word(s) at position(s) n.

```bash
-w 21 27 42
```

#### Known Translations ####
___

Segment: 0
```bash
./idkfa -s 0.0 -v l -i l
```

Segment: 1
```bash
./idkfa -s 0.1 -v l -p s -k divinity
```

Segment: 2
```bash
./idkfa -s 0.2 -v l
```

Segment: 3
```bash
./idkfa -s 0.3 -v l -i l -k 3
```

Segment: 4
```bash
./idkfa -s 0.4 -v l
```

Segment: 5
```bash
./idkfa -s 0.5 -v l -p s -k firfumferenfe
```

Segment: 6
```bash
./idkfa -s 0.6 -v l
```

Segment: 16
```bash
./idkfa -s 0.16 -v l -p s -k '$(ephi(x), x, primes())'
```

Segment: 17
```bash
./idkfa -s 0.17 -v l
```
