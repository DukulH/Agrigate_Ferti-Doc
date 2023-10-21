# Agrigate Ferti-Doc

- [Project summary](#project-summary)
  - [The issue we are hoping to solve](#the-issue-we-are-hoping-to-solve)
  - [How our technology solution can help](#how-our-technology-solution-can-help)
  - [Our idea](#our-idea)
- [Technology implementation](#technology-implementation)
  - [IBM AI service(s) used](#ibm-ai-services-used)
  - [Other IBM technology used](#other-ibm-technology-used)
  - [Solution architecture](#solution-architecture)
- [Presentation materials](#presentation-materials)
  - [Solution demo video](#solution-demo-video)
  - [Project development roadmap](#project-development-roadmap)
- [Additional details](#additional-details)
  - [How to run the project](#how-to-run-the-project)
  - [Live demo](#live-demo)
- [About this template](#about-this-template)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Project summary

### The issue we are hoping to solve

The problem that Agrigate Ferti Doc aims to address is the widespread issue of over-fertilization in agriculture, particularly in Bangladesh. Over-fertilization occurs when excessive amounts of fertilizers are applied to crops, resulting in adverse environmental effects, such as soil and water pollution, and negative impacts on biodiversity.

### How our technology solution can help

Optimized fertilizer recommendations for sustainable and efficient agriculture.

### Our idea

Agrigate Ferti Doc is a web application tailored for farmers in Bangladesh, offering personalized fertilizer recommendations. It provides precise guidance on the type and quantity of fertilizers needed for specific crops, soil types, and locations, promoting sustainable agricultural practices and reducing environmental impact. By preventing over-fertilization and ensuring responsible fertilizer use, the application contributes to a lower overall environmental impact and healthier ecosystems.

More detail is available in our [description document](./docs/DESCRIPTION.md).

## Technology implementation

### IBM AI service(s) used

Agrigate Ferti-Doc employs IBM Text to Speech (TTS) AI service
- [Watson Text to Speech](https://cloud.ibm.com/catalog/services/text-to-speech)
  - TTS is used to provide voice-based guidance and suggestions to users during different phases of the application.
  - It enhances the user experience by converting text into speech, ensuring the app is more accessible to a broader audience.
  - TTS also converts user inputs and recommendations into audio format, simplifying information delivery.

The IBM Text to Speech not only aids users in navigating the app but also fosters a smoother and more user-centric experience, especially for those who may prefer voice instructions. This approach greatly contributes to the success of Agrigate Ferti Doc in helping farmers make informed and responsible decisions regarding fertilizer use and crop management while supporting environmental sustainability.

### Other IBM technology used
None

### Solution architecture

Diagram and step-by-step description of the flow of our solution:

![Agrigate Ferti-Doc](https://github.com/DukulH/Agrigate_Ferti-Doc/blob/main/Agrigate%20Ferti-Doc%20System%20Architecture.jpg)

1. The user navigates to the site and uploads a video file.
2. Watson Speech to Text processes the audio and extracts the text.
3. Watson Translation (optionally) can translate the text to the desired language.
4. The app stores the translated text as a document within Object Storage.

## Presentation materials

### Solution demo video

[![Watch the video](https://raw.githubusercontent.com/DukulH/Agrigate_Ferti-Doc/main/docs/Capture.PNG)](https://www.youtube.com/watch?v=bmRsmN1CeIE_Bx0)

### Project development roadmap

The project currently does the following things.

![Roadmap](https://github.com/DukulH/Agrigate_Ferti-Doc/blob/main/Agrigate%20Ferti-Doc%20Road%20Map.jpg)


### Live demo
[Link](https://agrigate-ferti-doc.agrigate.network/)


