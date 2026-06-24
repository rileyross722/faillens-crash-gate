# Before: Large noisy CI log

A large noisy CI log becomes bounded failure evidence.

## Fixture

sample_large_ci_noise.log

## First lines

    ]633;E;{   echo "Starting CI job"\x3b   for i in $(seq 1 120)\x3b do     echo "progress line $i installing dependencies"\x3b   done\x3b   echo "src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations."\x3b   echo "npm ERR! Exit status 2"\x3b   echo "Process completed with exit code 1"\x3b } > test/fixtures/sample_large_ci_noise.log;418d2d9f-120b-48c3-8352-641393c6ae72]633;CStarting CI job
    progress line 1 installing dependencies
    progress line 2 installing dependencies
    progress line 3 installing dependencies
    progress line 4 installing dependencies
    progress line 5 installing dependencies
    progress line 6 installing dependencies
    progress line 7 installing dependencies
    progress line 8 installing dependencies
    progress line 9 installing dependencies
    progress line 10 installing dependencies
    progress line 11 installing dependencies
    progress line 12 installing dependencies
    progress line 13 installing dependencies
    progress line 14 installing dependencies
    progress line 15 installing dependencies
    progress line 16 installing dependencies
    progress line 17 installing dependencies
    progress line 18 installing dependencies
    progress line 19 installing dependencies
    progress line 20 installing dependencies
    progress line 21 installing dependencies
    progress line 22 installing dependencies
    progress line 23 installing dependencies

## Last lines

    progress line 101 installing dependencies
    progress line 102 installing dependencies
    progress line 103 installing dependencies
    progress line 104 installing dependencies
    progress line 105 installing dependencies
    progress line 106 installing dependencies
    progress line 107 installing dependencies
    progress line 108 installing dependencies
    progress line 109 installing dependencies
    progress line 110 installing dependencies
    progress line 111 installing dependencies
    progress line 112 installing dependencies
    progress line 113 installing dependencies
    progress line 114 installing dependencies
    progress line 115 installing dependencies
    progress line 116 installing dependencies
    progress line 117 installing dependencies
    progress line 118 installing dependencies
    progress line 119 installing dependencies
    progress line 120 installing dependencies
    src/App.tsx:4:28 - error TS2307: Cannot find module '@stripe/stripe-js' or its corresponding type declarations.
    npm ERR! Exit status 2
    Process completed with exit code 1
    
