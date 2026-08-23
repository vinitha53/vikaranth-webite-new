# Cocoa mascot model contract

The current renderer intentionally uses the supplied 2.5D poses because the
repository does not contain a rigged model and the available walk sheet has a
baked background.

To enable true locomotion later, add a compressed rigged model at:

`/public/models/cocoa-mascot.glb`

The model should provide these clips with matching names:

- `Idle`
- `Walk`
- `Wave`
- `Jump`
- `Point`
- `LookAround`
- `Happy`

The future model renderer should consume the existing `play`, `lookAt`,
`walkTo`, and `returnHome` controller API. Animation changes should cross-fade
over roughly 0.25 seconds. If WebGL or the model fails, keep `CocoaMascot.js`
as the image fallback.
