# Before: NPM missing module

A noisy npm failure becomes a compact missing dependency signal.

## Fixture

sample_npm_missing_module.log

## First lines

    starting build
    installing packages
    > app@1.0.0 build
    > vite build
    
    src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations.
    
    npm ERR! code ELIFECYCLE
    npm ERR! errno 2
    npm ERR! app@1.0.0 build: `vite build`
    npm ERR! Exit status 2
    Process completed with exit code 1
    

## Last lines

    starting build
    installing packages
    > app@1.0.0 build
    > vite build
    
    src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations.
    
    npm ERR! code ELIFECYCLE
    npm ERR! errno 2
    npm ERR! app@1.0.0 build: `vite build`
    npm ERR! Exit status 2
    Process completed with exit code 1
    
