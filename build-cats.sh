#!/bin/sh

OUTPUT_FILE="cats/cats.json"

echo "[" > "$OUTPUT_FILE"

for file in "./cats/"/*; do
    relative_path="${file#./cats//}"
    echo "  \"${relative_path//\"/\\\"}\"," >> "$OUTPUT_FILE"
done

sed -i '$ s/,$//' "$OUTPUT_FILE"
echo "]" >> "$OUTPUT_FILE"

echo "Cats list generated at $OUTPUT_FILE"