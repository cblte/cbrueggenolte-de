function favicons() {
  this.hidden = 'hidden';
  this.visibilityChange = 'visibilitychange';
  this.favicon = document.querySelector("[rel='shortcut icon']").href;
  this.title = document.title;
  this.wasSpoofed = false;
  this.spoofed = [];

  this.services = {
    sy: () => {
      let title = 'Official Church of Scientology: Difficulties on the Job - Online Course';
      let favicon = '/images/disablejs/sy.png';
      return {
        title,
        favicon,
      };
    },
    cdc: () => {
      let title = 'Ask HN: How could I safely contact drug cartels?';
      let favicon = '/images/disablejs/hn.png';
      return {
        title,
        favicon,
      };
    },
    rps: () => {
      let title = 'rust programming socks - Google Shopping';
      let favicon = '/images/disablejs/go.ico';
      return {
        title,
        favicon,
      };
    },
    aec: () => {
      let title = 'Adult entertainment clubs - Google Maps';
      let favicon = '/images/disablejs/gm.png';
      return {
        title,
        favicon,
      };
    },
    pul: () => {
      let title = 'Pick up lines suggestions - ChatGPT';
      let favicon = '/images/disablejs/cgpt.png';
      return {
        title,
        favicon,
      };
    },
    fes: () => {
      let title = 'The Flat Earth Society';
      let favicon = '/images/disablejs/fes.png';
      return {
        title,
        favicon,
      };
    },
    tsm: () => {
      let title = 'Amazon.com: taylor swift merch';
      let favicon = '/images/disablejs/az.ico';
      return {
        title,
        favicon,
      };
    },
    wp: () => {
      let title = 'Amazon.com: waifu pillow';
      let favicon = '/images/disablejs/az.ico';
      return {
        title,
        favicon,
      };
    },
    rwsb: () => {
      let title = 'r/wallstreetbets on Reddit';
      let favicon = '/images/disablejs/rd.png';
      return {
        title,
        favicon,
      };
    },
    iw: () => {
      let title = "Infowars: There's a War on For Your Mind!";
      let favicon = '/images/disablejs/iw.png';
      return {
        title,
        favicon,
      };
    },
    tac: () => {
      let title = 'The Anarchist Cookbook by William Powell | Goodreads';
      let favicon = '/images/disablejs/gr.png';
      return {
        title,
        favicon,
      };
    },
    nxfs: () => {
      let title = 'Fifty Shades of Grey | Netflix';
      let favicon = '/images/disablejs/nx.ico';
      return {
        title,
        favicon,
      };
    },
    jbn: () => {
      let title = 'jeff bezos nudes - Google Image Search';
      let favicon = '/images/disablejs/go.ico';
      return {
        title,
        favicon,
      };
    },
    nggyu: () => {
      let title = 'Rick Astley - Never Gonna Give You Up - YouTube';
      let favicon = '/images/disablejs/yt.ico';
      return {
        title,
        favicon,
      };
    },
    beast: () => {
      let title = 'MrBeast en Español - YouTube';
      let favicon = '/images/disablejs/yt.ico';
      return {
        title,
        favicon,
      };
    },
    ftx: () => {
      let title = 'FTX Cryptocurrency Exchange';
      let favicon = '/images/disablejs/ftx.png';
      return {
        title,
        favicon,
      };
    },
  };

  this.enabledServices = Object.keys(this.services);

  this.init = function () {
    if (typeof document.mozHidden !== 'undefined') {
      this.hidden = 'mozHidden';
      this.visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    }
    document.addEventListener(this.visibilityChange, this.handler.bind(this), false);
  };

  this.default = function () {
    let title = this.title;
    let favicon = this.favicon;
    this.update({
      title,
      favicon,
    });
  };

  this.update = function (data) {
    let cacheBuster = '?v=' + Math.round(Math.random() * 10000000);
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = data.favicon + cacheBuster;
    document.getElementsByTagName('head')[0].querySelector("[rel='shortcut icon']").remove();
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = data.title;
    if (this.wasSpoofed === true) {
      document.getElementById('disablejs').style.display = 'block';
      document.getElementById('disablejs').innerHTML = `
        <p>
          <strong>(CLICK/TAP THIS OVERLAY ANYWHERE TO CLOSE IT)</strong>
        </p>
        <p>
          Ah, yes. That moment. The one that sends a chill down your spine and makes you do a quick, frantic scan of your surroundings, hoping nobody noticed that brief, undeniable flash of panic on your face. You know <strong>exactly</strong> what I'm talking about: That split second when you spot <em>that website</em> in your browser's tab bar.
        </p>
        <p>
          Heart pounding, you dart a glance at your coworkers, your friends, your partner, or anyone in the vicinity, searching for signs of judgment or, worse, curiosity. No one's looking, but somehow, you feel like everyone is. It's like the universe knows, and it's giggling behind its hand. You quickly click over to the tab, praying, hoping it's not what you think it is.
        </p>
        <p>
          And then, oh sweet relief, it's not <strong>that</strong>. But now, a whole new, equally horrible truth sinks in. You've just been pranked by the cruel, merciless soul who crafted this infernal website. You, my friend, have just experienced the finest torture modern web technology has to offer: Unwarranted suspense, followed by the revelation that <em>nothing is as it seems</em>.
        </p>
        <p>
          JavaScript, you son of a smoking gun. The great trickster of the web, slinking in the background, making you believe that your browsing experience is smooth and simple, only to slap you with a pop-up, a subtle redirect, or worse, a blinking ad that's seemingly impossible to close.
        </p>
        <p>
          And here you are, caught in the endless cycle of knowing you should turn JavaScript off but just <strong>not</strong> caring enough to actually do it. It's like knowing you should stop eating those extra chips but doing it anyway. But this? This is the universe giving you a little nudge, perhaps a <em>not-so-subtle</em> one, reminding you of your folly.
        </p>
        <p>
          So, here it is, loud and clear: <strong>Turn JavaScript off, now, and only allow it on websites you trust!</strong> Save your sanity, preserve your dignity, and maybe give your browser a fighting chance at actually doing what <strong>you</strong> want it to do. Because if you don't, the next time you see that icon, your heart might not only drop, it might skip a beat or two.
        </p>
        <p>
          <a href="https://disable-javascript.org" target="_self" title="disable-javascript.org">More information here.</a>
        </p>
        <p>
          <strong>(CLICK/TAP THIS OVERLAY ANYWHERE TO CLOSE IT)</strong>
        </p>
        `;
    }
  };

  this.spoof = function () {
    let i = 0;
    if (this.spoofed.length === this.enabledServices.length) {
      this.spoofed.length = 0;
    }
    for (let es = 0; es < this.enabledServices.length; es++) {
      i = Math.round(Math.random() * (this.enabledServices.length - 1));
      if (this.spoofed.includes(i) === false) {
        break;
      }
    }
    this.spoofed.push(i);
    let service = this.enabledServices[i];
    if (service && this.services[service]) {
      this.update(this.services[service]());
    }
    this.wasSpoofed = true;
  };

  this.handler = function () {
    if (document[this.hidden]) {
      this.spoof();
    } else {
      this.default();
    }
  };

  this.init();
}

function closeDisablejsInfo() {
  document.getElementById('disablejs').style.display = 'none';
}
