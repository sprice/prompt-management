# Goal

Using the `<content>` context below, create a set of Anki cards which can be imported into the Anki software.

# Key Points and Requirements

1. **Input Context**: You will receive all relevant information within the `<content>` tag. Use *only* this context to create the cards.
2. **Card Creation**:
- Extract key facts, definitions, concepts, or Q&A structures from the context.
- Convert them into concise question-answer pairs.
- Make sure the questions appear on the "Front" and the corresponding answers appear on the "Back."
- *Avoid redundancy*: if you see repeat information, combine or omit it for clarity.
3. **Format**:
- You must return a single code block in "Anki Cards In Plain Text" format.
- The first lines should be:
```
#separator:tab
#html:true
Front    Back
```
- After that header, each card should occupy exactly one line, with the front and back separated by a tab character.
- Use minimal HTML entities (e.g., `&quot;`) for special characters where necessary.
4. **Answer Style**:
- Provide concise explanations on the "Back."
- Ensure each question can be answered solely from the provided context.
- You may lightly rephrase or reorganize the text but do not inject external information or speculation.
5. **Output Restrictions**:
- Return *only* the code block containing the Anki-format text. 
- Do not include additional commentary, markdown, or explanations outside the code block.

# Example

Below is an example illustrating how your output should look. Note the use of `#separator:tab` and `#html:true` headers:

```
#separator:tab
#html:true
Front	Back
Who painted &quot;The Starry Night&quot;?	Vincent van Gogh painted &quot;The Starry Night&quot; in 1889 while at the Saint-Paul-de-Mausole asylum. The iconic painting features a night sky filled with swirling clouds, brilliant stars, and a crescent moon over a sleeping village with a prominent church spire.
"What art movement did Marcel Duchamp&#x27;s &quot;Fountain&quot; (1917) belong to?"	Dada/Dadaism. This revolutionary piece, consisting of a standard porcelain urinal signed with the pseudonym &quot;R. Mutt,&quot; helped establish the concept of readymade art and challenged traditional definitions of artistic creation.
Which civilization created the terracotta warriors?	"The Qin Dynasty of ancient China created the Terracotta Army (210-209 BCE). These thousands of life-sized clay soldiers were buried with China&#x27;s first emperor, Qin Shi Huang, to protect him in the afterlife. Each warrior has unique facial features, and they were originally painted in bright colors."
What is chiaroscuro?	Chiaroscuro is an art technique using strong contrasts between light and dark to create a sense of volume and dramatic atmosphere. This technique was mastered by Renaissance artists like Caravaggio and became a defining characteristic of Baroque art.
Name the artist who created &quot;The Birth of Venus.&quot;	"Sandro Botticelli created &quot;The Birth of Venus&quot; (c. 1485). This masterpiece of the Italian Renaissance depicts Venus emerging from the sea on a giant scallop shell, being blown towards shore by the winds. It&#x27;s notable for its classical mythology theme and is housed in the Uffizi Gallery in Florence."
```

# Instruction

Review all of the content in the `<content>` context, then create and return the final Anki cards as described above. Base the number of cards on the context provided.

# Context

<content>
{{ context }}
</content>
