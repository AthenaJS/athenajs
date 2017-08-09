/*jshint devel: true*/
/**
 * `AudioManager` handles playback of audio files loaded using the `ResourceManager`
 * 
 * @property {Object} audioCache An hash that stores in-use sounds.
 * The key is the id of the sound.
 * @property {boolean} enabled This is set to false when sound playback is disabled.
 */
export default {
    audioCache: {},
    enabled: true,
    /**
     * Adds a new sound element to the audio cache.
     * *Note* if a sound with the same id has already been added, it will be replaced
     * by the new one.
     * 
     * @param {String} id
     * @param {HTMLAudioElement} element
     */
    addSound: function (id, element) {
        this.audioCache[id] = element;
    },
    /**
     * Toggles global sound playback
     * 
     * @param {Boolean} bool whether to enabled or disable sound playback.
     */
    toggleSound: function (bool) {
        this.enabled = bool;
    },
    /**
     * Plays the specified sound with `id`.
     * 
     * @param {String} id
     * @param {Boolean} loop
     * @param {Float} volume
     * @param {Float} panning
     * @returns the created sound instance
     */
    play: function (id, loop, volume, panning) {
        let instance = null,
            sound = null;

        if (!this.enabled) {
            return;
        }

        sound = this.audioCache[id];

        if (typeof sound === 'undefined') {
            console.warn('[AM] could not find sound, did you load:', id);
            return;
        }

        if (typeof sound.loop === 'function') {
            sound.loop(loop || false);
        } else {
            sound.loop = loop || false;
        }

        instance = sound.play({
            panning: [panning || 0, 0, 5],
            volume: volume || 1,
            loop: loop || false
        });

        return instance;
    },
    /**
     * Stops playing the sound id
     * 
     * @param {any} id
     * @param {any} instanceId
     * @returns
     */
    stop: function (id, instanceId) {
        let sound = null;

        if (!this.enabled) {
            return;
        }

        try {
            sound = this.audioCache[id];
        } catch (err) {
            console.warn('[AM] WARN: unable to stop sound', id);
            return;
        }

        if (sound && typeof sound.stop === 'function') {
            sound.stop(instanceId || undefined);
        }
    }
};