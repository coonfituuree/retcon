# My diagrams

| Diagram            | Editable source                    | Readable export                  |
| ------------------ | ---------------------------------- | -------------------------------- |
| System context     | [context.puml](context.puml)       | [context.svg](context.svg)       |
| Use cases          | [use-cases.puml](use-cases.puml)   | [use-cases.svg](use-cases.svg)   |
| Current components | [components.puml](components.puml) | [components.svg](components.svg) |

I label target scenarios as planned. The component diagram shows only the executable Auth backend. I update source and export together.

I use PlantUML 1.2026.8 with Smetana and Java 11 or newer. The rendering tool is not a backend dependency. From the project root, with an appropriate local JAR path:

```powershell
java '-Djava.awt.headless=true' -jar C:/tools/plantuml-1.2026.8.jar -charset UTF-8 -tsvg "docs/diagrams/*.puml"
```
