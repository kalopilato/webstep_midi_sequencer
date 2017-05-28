# WebStep

WebStep is a browser based, grid style MIDI step sequencer. The intended purpose of this app is to control external hardware synthesizers or samplers, it doesn't currently have a built in audio engine so you'll need at least one MIDI output device connected to do anything useful. That being said, WebStep should work fine with _any_ MIDI enabled synthesizer/sampler that's visible to your operating system.
If you don't have any MIDI hardware to control you can [route WebStep to a software synthesizer](#routing-to-a-software-synthesizer) via a virtual MIDI port.

This project is a work in progress and is really just a learning exercise as I fumble my way through learning about a few things I'm interested in:
* React
* Redux
* JS / ES6
* Webpack
* Babel
* Web MIDI API

This is definitely not an example of React/Redux best practise or how to structure a JS app but, as I learn more and time allows, the code quality _should_ improve. :persevere:

WebStep is deployed on [GitHub Pages](https://kalopilato.github.io/webstep_midi_sequencer/) if you'd like to give it a go.

## Routing to a software synthesizer

If you don't have a MIDI output device it's quite simple to route WebStep to a software synthesizer on macOS (tested on Sierra 10.12.5).

You'll need a MIDI controllable software synthesizer installed (I used Matt Tytel's [Helm](http://tytel.org/helm/)), and we'll turn on a Virtual MIDI port
on your Mac to route MIDI messages from WebStep to your software synthesizer:
1. Open up the Audio MIDI Setup console (Cmd+Space and type 'Audio MIDI Setup')
2. Open the MIDI configuration (Window > Show MIDI Studio)
3. Open the IAC Driver Properties
4. Check the box `Device is online`
5. Rename the port if you wish (mine's just called `Bus 1` by default)

Now when you open the software synth you should be able to select your newly enabled virtual MIDI port as the input for the synthesizer (for Helm this option
is found by clicking the Helm logo top left). If you now load up/refresh WebStep you should be able to select the virtual MIDI port as an output.

This is possible on a Windows machine too but you'll need to install an application to create the virtual MIDI port. If/when I get the chance to test this I'll update this doc.

***Note:** The Web MIDI API has limited browser support. This app is developed using the latest version of Chrome and hasn't been tested for compatibility in any other browsers.*