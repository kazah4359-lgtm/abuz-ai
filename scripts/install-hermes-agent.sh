#!/bin/bash
# Скрипт для установки Hermes Agent (от Nous Research)
# Документация: https://hermes-agent.nousresearch.com/docs/getting-started/installation

echo "Начинаем установку Hermes Agent..."
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

echo "Установка завершена! Чтобы использовать команду 'hermes', перезапустите терминал или выполните:"
echo "source ~/.bashrc"
