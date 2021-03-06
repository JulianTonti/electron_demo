# electron_demo

A basic electron demo

## Setup
Install [NodeJS](https://nodejs.org/en/download/) if required
```bash
git clone https://github.com/JulianTonti/electron_demo.git
cd electron_demo
npm install
```

## Launch
```bash
npm start
```

## Compile
```bash
npm run make #then look in the ./out directory
```

## Sample
You can find the following Mermaid plot in ./src/mermaid.txt

```mermaid
flowchart TD
  A(VOEvent) --> B{Is Event from TODO?}
  B --> |YES| C{"Have we observed\nthis event before?"}
  B --> |NO| END(Ignore)
  C --> |YES| D{"Has the position improved\nenough to reobserve?"}
  C --> |NO| E{Source type?}
  D --> END
  E --> F[GRB]
  E --> G[Flare Star] --> END
  E --> H[GW] --> END
  E --> I[Neutrino] --> END
  F --> J{"Fermi GRB probability > 50.0\nor\nSWIFT Rate signif > 0.0 sigma"}
  J --> |YES| K{"Trigger duration between\n 0.256 and 1.024s"}
  J --> |NO| END
  K --> |YES| L[Trigger Observation]
  K --> |NO| M{"Trigger duration between\n 1.025 and 2.056s"}
  M --> |YES| N[Pending a human's decision]
  M --> |NO| END
subgraph GRB
  J 
  K 
  L 
  M 
  N
end
  style A fill:blue,color:white
  style END fill:red,color:white
  style L fill:green,color:white
  style N fill:orange,color:white
```