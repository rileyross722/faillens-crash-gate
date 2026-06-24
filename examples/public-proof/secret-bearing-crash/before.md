# Before: Secret-bearing crash

A crash log with secret-like material is redacted before agent use.

## Fixture

sample_secret_leak.log

## First lines

    Running CI job
    DATABASE_URL=postgres://admin:supersecret@localhost:5432/app
    Authorization: Bearer [REDACTED_TOKEN]
    npm ERR! Cannot find module '@stripe/stripe-js'
    Process completed with exit code 1
    

## Last lines

    Running CI job
    DATABASE_URL=postgres://admin:supersecret@localhost:5432/app
    Authorization: Bearer [REDACTED_TOKEN]
    npm ERR! Cannot find module '@stripe/stripe-js'
    Process completed with exit code 1
    
