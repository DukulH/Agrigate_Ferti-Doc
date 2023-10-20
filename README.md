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

Agrigate Ferti-Doc employs two key IBM AI services:
IBM Text to Speech (TTS)
IBM Watson Assistant

- [Watson Assistant](https://cloud.ibm.com/catalog/services/watson-assistant)
  - Watson Assistant functions as an interactive virtual assistant, offering valuable user support and clarifying how the application operates.
  - It helps users with queries, provides clarifications, and furnishes essential information related to the use of Agrigate Ferti Doc.
  - The presence of Watson Assistant significantly enhances the user experience by making the application more user-friendly and informative.

- [Watson Text to Speech](https://cloud.ibm.com/catalog/services/text-to-speech)
  - TTS is used to provide voice-based guidance and suggestions to users during different phases of the application.
  - It enhances the user experience by converting text into speech, ensuring the app is more accessible to a broader audience.
  - TTS also converts user inputs and recommendations into audio format, simplifying information delivery.

The combination of IBM Text to Speech and Watson Assistant not only aids users in navigating the app but also fosters a smoother and more user-centric experience, especially for those who may prefer voice instructions or require additional guidance. This approach greatly contributes to the success of Agrigate Ferti Doc in helping farmers make informed and responsible decisions regarding fertilizer use and crop management while supporting environmental sustainability.

### Other IBM technology used
None

### Solution architecture

Diagram and step-by-step description of the flow of our solution:

![Video transcription/translaftion app](https://developer.ibm.com/developer/tutorials/cfc-starter-kit-speech-to-text-app-example/images/cfc-covid19-remote-education-diagram-2.png)

1. The user navigates to the site and uploads a video file.
2. Watson Speech to Text processes the audio and extracts the text.
3. Watson Translation (optionally) can translate the text to the desired language.
4. The app stores the translated text as a document within Object Storage.

## Presentation materials

_INSTRUCTIONS: The following deliverables should be officially posted to your My Team > Submissions section of the [Call for Code Global Challenge resources site](https://cfc-prod.skillsnetwork.site/), but you can also include them here for completeness. Replace the examples seen here with your own deliverable links._

### Solution demo video

[![Watch the video](https://raw.githubusercontent.com/DukulH/Agrigate_Ferti-Doc/main/docs/Agrigate%20Ferti%20Doc-WBG.jpg)](https://www.youtube.com/watch?v=bmRsmN1CeIE_Bx0)

### Project development roadmap

The project currently does the following things.

- Feature 1
- Feature 2
- Feature 3

In the future we plan to...

See below for our proposed schedule on next steps after Call for Code 2023 submission.

![Roadmap](./images/roadmap.jpg)

## Additional details

_INSTRUCTIONS: The following deliverables are suggested, but **optional**. Additional details like this can help the judges better review your solution. Remove any sections you are not using._

### How to run the project

INSTRUCTIONS: In this section you add the instructions to run your project on your local machine for development and testing purposes. You can also add instructions on how to deploy the project in production.

### Live demo

You can find a running system to test at...

See our [description document](./docs/DESCRIPTION.md) for log in credentials.

---

_INSTRUCTIONS: You can remove the below section from your specific project README._

## About this template

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

### Authors

<a href="https://github.com/Call-for-Code/Project-Sample/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Call-for-Code/Project-Sample" />
</a>

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

### License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
