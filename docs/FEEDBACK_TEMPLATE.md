# FailLens Feedback Template

Use this after running a real failed log through FailLens.

Do not paste raw logs or secrets into this template.

## Test context

Project type:

Command or CI surface:

Operating system:

Agent/tool used, if any:

## Raw failure metadata

Rough raw log length:

Was the raw log noisy?

Did the raw log contain secret-looking material? Use yes/no only.

## FailLens result

Was failure.type correct?

Was failure.subject useful?

Was failure.likely_next useful?

Was safe_to_send correct?

Was the failure window useful?

Were secrets redacted correctly?

## Agent behavior

Did the agent use FailLens without being reminded?

Did the agent understand the FailLens output?

Did the agent take a useful next step?

## Score

0 = useless  
1 = slightly useful  
2 = useful but clunky  
3 = useful and repeatable  
4 = sticky/default-worthy

Score:

## Notes

What should FailLens improve?
