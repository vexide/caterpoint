#!/bin/sh

OUTPUT_FILE="cats/cats.json"

echo "[" > "$OUTPUT_FILE"

for file in "./cats/"/*; do
    relative_path="${file#./cats//}"
    if [[ "$relative_path" == "cats.json" ]]; then
        continue
    fi
    echo "  \"${relative_path//\"/\\\"}\"," >> "$OUTPUT_FILE"
done

sed -i '$ s/,$//' "$OUTPUT_FILE"
echo "]" >> "$OUTPUT_FILE"

echo "Cats list generated at $OUTPUT_FILE"