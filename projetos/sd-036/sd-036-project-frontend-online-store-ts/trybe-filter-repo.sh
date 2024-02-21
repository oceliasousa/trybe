#!/bin/bash

### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'trybe-publisher' fornecido
## pela Trybe.

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path trybe.yml \
    --path trybe-filter-repo.sh \
    --path src/__tests__ \
    --path src/__mocks__ \
    --path wireframes \
    --path it-only.png \
    --path only-one-green.png \
    --path pull-request-para-branch-do-grupo.png \
    --path only-one-green.png \
    --path trello.gif \
    --path exemplo-motorola.json \
    --path README.md \
    --invert-paths --force --quiet
