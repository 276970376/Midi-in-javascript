Midi.requireClass("TrackChunk");
Midi.requireClass("MidiUtil");
Midi.requireClass("FlashPlayer");

Midi.Sequence;
(function() {
 
G_LC = {
    COPY_RIGHT : "©2013 by yarmyarch@live.cn - Dreamline Studio, all rights reserved."
};
    
Sequence = function(midiType, frames) {
    
    var self = this,
        _lc = G_LC;
    
    // private attributes.
    var buf = {
        tracks : [],
        name : "",
        // 1 for the default
        midiType : 1,
        // 120 for the default.
        frames : Math.max(+frames, 24) || 120,
    }
    
    var init = function() {
        
        !isNaN(midiType % 3) && (buf.midiType = midiType % 3);
        
        var track = new Midi.TrackChunk();
        buf.tracks.push(track);
        
        // set default info for the sequence, into the first track.
        // mainly about the copyright, and some other messags that might be required in future.
        // No channel info set in the first track.
        track.setEvent(0, 0xFF02, _lc.COPY_RIGHT);
    };
    
    self.setCopyRight = function(text) {
        
        buf.tracks[0].setEvent(0, 0xFF02, text);
    };
    
    self.setName = function(text) {
        buf.name = text;
        buf.tracks[0].setEvent(0, 0xFF03, text);
    };
    
    self.getName = function() {
        return buf.name;
    };
    
    self.setMidiType = function(newType) {
        !isNaN(newType % 3) && (buf.midiType = newType % 3);
    };
    
    self.getMidiType = function() {
        return buf.midiType;
    };
    
    /**
     * min 24, 120 for default.
     */
    self.setFrames = function(newFrames) {
        buf.frames = Math.max(+newFrames, 24) || 120;
    };
    
    self.getFrames = function() {
        return buf.frames;
    };
    
    self.toByteArray = function() {
        
        var result = [],
            _buf = buf,
            tracks = buf.tracks;
        // generate header first. Related attributes required.
        result = result.concat(MidiUtil.getHeaderChunk(_buf.midiType, _buf.tracks.length, _buf.frames));
        
        for (var i in tracks) {
            result = result.concat(tracks[i].toByteArray());
        }
        return result;
    };
    
    init();
    return self;
};
    
})();