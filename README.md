# Double connection bug

What I suspect is happening is a double connection. You can reproduce it and see the effects in the console using these steps

## Reproduction

1. Run `yarn start` and go to http://localhost:3000
2. Open the console and see that that there has been a mount, dismount, and a mount of the Chatkit component. You'll notice on dismount in `ChatKit.js` we run a disconnect function.
3. Type something in the text box and press send. In the console you'll notice that two `onMessageHook` events are fired.
4. Click "unmount chatkit" - this will run the disconnect function and you _should_ be disconnected from chatkit.
5. With that window still open, open a new window and navigate to localhost:3000. You should have two windows of the app open right now. One with the input box, and one without.
6. In the new window type something in the input box and click send. Look in the console of the umounted app and you'll notice that an `onMessageHook` was still fired...there's still a connection.

There's somehow two connections being created when you mount a component in VERY quick succession.
