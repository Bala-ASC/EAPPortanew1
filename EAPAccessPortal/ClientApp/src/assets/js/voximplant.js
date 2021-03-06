var VoxImplant = function(e) {
  function t(r) {
      if (n[r]) return n[r].exports;
      var i = n[r] = {
          i: r,
          l: !1,
          exports: {}
      };
      return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
  }
  var n = {};
  return t.m = e, t.c = n, t.d = function(e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: r
      })
  }, t.n = function(e) {
      var n = e && e.__esModule ? function() {
          return e.default
      } : function() {
          return e
      };
      return t.d(n, "a", n), n
  }, t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
  }, t.p = "/build", t(t.s = 46)
}([function(e, t, n) {
  "use strict";

  function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : e[t] = n, e
  }

  function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var o = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var a;
  ! function(e) {
      e[e.NONE = 0] = "NONE", e[e.ERROR = 1] = "ERROR", e[e.WARNING = 2] = "WARNING", e[e.INFO = 3] = "INFO", e[e.TRACE = 4] = "TRACE"
  }(a = t.LogLevel || (t.LogLevel = {}));
  var s;
  ! function(e) {
      e[e.SIGNALING = 0] = "SIGNALING", e[e.RTC = 1] = "RTC", e[e.USERMEDIA = 2] = "USERMEDIA", e[e.CALL = 3] = "CALL", e[e.CALLEXP2P = 4] = "CALLEXP2P", e[e.CALLEXSERVER = 5] = "CALLEXSERVER", e[e.CALLMANAGER = 6] = "CALLMANAGER", e[e.CLIENT = 7] = "CLIENT", e[e.AUTHENTICATOR = 8] = "AUTHENTICATOR", e[e.PCFACTORY = 9] = "PCFACTORY", e[e.UTILS = 10] = "UTILS", e[e.ORTC = 11] = "ORTC", e[e.MESSAGING = 12] = "MESSAGING", e[e.REINVITEQ = 13] = "REINVITEQ", e[e.HARDWARE = 14] = "HARDWARE", e[e.ENDPOINT = 15] = "ENDPOINT", e[e.EVENTTARGET = 16] = "EVENTTARGET"
  }(s = t.LogCategory || (t.LogCategory = {}));
  ! function(e) {
      e[e.DISCONNECTED = "DISCONNECTED"] = "DISCONNECTED", e[e.CONNECTING = "CONNECTING"] = "CONNECTING", e[e.CONNECTED = "CONNECTED"] = "CONNECTED", e[e.LOGGING_IN = "LOGGING_IN"] = "LOGGING_IN", e[e.LOGGED_IN = "LOGGED_IN"] = "LOGGED_IN"
  }(t.ClientState || (t.ClientState = {}));
  var c = function() {
      function e(t, n, r) {
          i(this, e), this.category = t, this.label = n, this.provider = r
      }
      return o(e, [{
          key: "log",
          value: function(e, t) {
              this.provider.writeMessage(this.category, this.label, e, t)
          }
      }, {
          key: "error",
          value: function(e) {
              this.log(a.ERROR, e)
          }
      }, {
          key: "warning",
          value: function(e) {
              this.log(a.WARNING, e)
          }
      }, {
          key: "info",
          value: function(e) {
              this.log(a.INFO, e)
          }
      }, {
          key: "trace",
          value: function(e) {
              this.log(a.TRACE, e)
          }
      }]), e
  }();
  t.Logger = c;
  var l = function() {
      function e() {
          i(this, e), this.timeOriginGap = 0, this.isFirstPrint = !0, this.levels = {}, this.showTrace = !1, this._shadowLogging = !1
      }
      return o(e, [{
          key: "getSLog",
          value: function() {
              return this._shadowLog
          }
      }, {
          key: "clearSilentLog",
          value: function() {
              this._shadowLog = []
          }
      }, {
          key: "setLoggerCallback",
          value: function(e) {
              this._outerCallback = e
          }
      }, {
          key: "setPrettyPrint",
          value: function(e) {
              this.prettyPrint = e
          }
      }, {
          key: "setLogLevel",
          value: function(e, t) {
              t === a.TRACE ? this.showTrace = !0 : this.levels[s[e]] = t
          }
      }, {
          key: "writeMessage",
          value: function(t, n, i, o) {
              i === a.TRACE ? e.traceTick++ : e.logTick++, this.timeOriginGap || (this.timeOriginGap = performance.now());
              var c = "string" == typeof o ? o : JSON.stringify(o),
                  l = this.isFirstPrint ? this.prettyPrint ? (new Date).toUTCString() : (new Date).toString() : parseInt("" + (performance.now() - this.timeOriginGap) / 1e3),
                  u = i === a.TRACE ? "VIWSTR " + e.traceTick : "VIWSLR " + e.logTick,
                  d = u + " " + l + " " + a[i] + " " + n + ": " + c;
              if (i <= (void 0 !== this.levels[s[t]] ? this.levels[s[t]] : a.NONE) || i === a.TRACE && this.showTrace) {
                  if (void 0 !== console.debug && void 0 !== console.info && void 0 !== console.error && void 0 !== console.warn)
                      if (this.prettyPrint) {
                          var g, f = "%c" + u + " " + l + " [" + a[i] + "] %c" + n + ": %c" + c,
                              p = (g = {}, r(g, a.ERROR, "color:#fab005"), r(g, a.WARNING, "color:#af2a2a"), r(g, a.INFO, "color:#0ca678"), r(g, a.TRACE, "color:#8f66ff"), g);
                          i === a.ERROR ? console.error(d) : i === a.WARNING ? console.warn(f, p[i], "color:#2375a2", "color:#000") : i === a.INFO ? console.info(f, p[i], "color:#2375a2", "color:#000") : i === a.TRACE ? console.debug(f, p[i], "color:#2375a2", "color:#000") : console.log(f, p[i], "color:#2375a2", "color:#000")
                      } else i === a.ERROR ? console.error(d) : i === a.WARNING ? console.warn(d) : i === a.INFO ? console.info(d) : i === a.TRACE ? console.debug(d) : console.log(d);
                  else console.log(d);
                  this.isFirstPrint && (this.isFirstPrint = !1)
              }
              this.shadowLogging && (i !== a.TRACE || this.showTrace) && this._shadowLog.push(d), "function" != typeof this._outerCallback || i === a.TRACE && !this.showTrace || this._outerCallback({
                  formattedText: d,
                  category: t,
                  label: n,
                  level: i,
                  message: c
              })
          }
      }, {
          key: "createLogger",
          value: function(e, t) {
              return new c(e, t, this)
          }
      }, {
          key: "_traceName",
          value: function() {
              return "Logger"
          }
      }, {
          key: "shadowLogging",
          get: function() {
              return this._shadowLogging
          },
          set: function(e) {
              this._shadowLogging || (this._shadowLog = []), this._shadowLogging = e
          }
      }], [{
          key: "get",
          value: function() {
              return void 0 === this.inst && (this.inst = new e, this.inst.prettyPrint = !1), this.inst
          }
      }, {
          key: "d_trace",
          value: function(t) {
              return function(n, r, i) {
                  return {
                      value: function() {
                          for (var o = arguments.length, s = Array(o), c = 0; c < o; c++) s[c] = arguments[c];
                          var l = "login" === r || "basicLogin" === r || "sendWSMessage" === r && "login" === s[0],
                              u = "sendWSMessage" === r ? 2 : 1,
                              d = n._traceName ? n._traceName() + (this && this.settings ? " " + this.settings.id : this && this.id && "function" != typeof this.id ? " " + this.id : "") : "",
                              g = "";
                          try {
                              g = s.map(function(e, t) {
                                  return l && t === u ? '"********"' : JSON.stringify(e)
                              }).join()
                          } catch (e) {
                              g = "circular structure"
                          }
                          return e.get().writeMessage(t, d, a.TRACE, r + "(" + g + ")"), i.value.apply(this, s)
                      }
                  }
              }
          }
      }]), e
  }();
  l.logTick = 0, l.traceTick = 0, t.LogManager = l
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      },
      c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var u = n(28),
      d = n(14),
      g = n(20),
      f = n(2),
      p = n(11),
      v = n(7),
      h = n(0),
      m = n(8),
      y = n(6),
      C = n(15),
      S = n(3),
      _ = n(13),
      E = n(17),
      L = n(64),
      M = n(65),
      b = n(33),
      R = n(4),
      T = n(42),
      k = function(e) {
          function t() {
              r(this, t);
              var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              if (e._connected = !1, e.progressToneScript = {
                      US: "440@-19,480@-19;*(2/4/1+2)",
                      RU: "425@-19;*(1/3/1)"
                  }, e.playingNow = !1, e.serversList = [], e.level = 100, e.micRequired = !1, e.videoConstraints = null, e.progressToneCountry = "US", e.progressTone = !0, e.enableTrace = !1, e.showDebugInfo = !1, e.showWarnings = !1, e.RTCsupported = !1, e._deviceEnumAPI = !1, e._h264first = !1, e._VP8first = !1, e.depLastDevices = {
                      ai: [],
                      ao: [],
                      vi: []
                  }, e._alreadyInitialized = !1, t.instance) throw new Error("Error - use VoxImplant.getInstance()");
              return t.instance = e, e._promises = {}, v.default.init(), m.PCFactory.get().requireMedia = !1, e.voxSignaling = f.VoxSignaling.get(), e.voxCallManager = y.CallManager.get(), e.setLogLevelAll(h.LogLevel.NONE), f.VoxSignaling.get().setRPCHandler(_.RemoteEvent.onPCStats, function(t, n) {
                  m.PCFactory.get().getPeerConnect(t) && e.dispatchEvent({
                      name: "NetStatsReceived",
                      stats: n
                  })
              }), e.logger = h.LogManager.get().createLogger(h.LogCategory.CLIENT, e._traceName()), e._defaultSinkId = null, e.loginState = 0, e
          }
          return o(t, e), a(t, [{
              key: "playProgressTone",
              value: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                  (!e || e && this.progressTone) && null !== this.progressToneScript[this.progressToneCountry] && (this.playingNow || this.playToneScript(this.progressToneScript[this.progressToneCountry]), this.playingNow = !0)
              }
          }, {
              key: "stopProgressTone",
              value: function() {
                  this.playingNow && (this.stopPlayback(), this.playingNow = !1)
              }
          }, {
              key: "onIncomingCall",
              value: function(e, t, n, r, i) {
                  this.dispatchEvent({
                      name: d.Events.IncomingCall,
                      call: y.CallManager.get().calls[e],
                      headers: r,
                      video: i
                  })
              }
          }, {
              key: "init",
              value: function(e) {
                  var n = this;
                  return new Promise(function(r, i) {
                      if (n.alreadyInitialized && i(new Error("WebSDK already initialized")), n._alreadyInitialized = !0, n._config = void 0 !== e ? e : {}, void 0 !== n._config.progressToneCountry && (n.progressToneCountry = n._config.progressToneCountry), !0 !== n._config.progressTone && (n.progressTone = !1), void 0 !== n._config.serverIp && (n.serverIp = n._config.serverIp), void 0 !== n._config.enableTrace && (n.enableTrace = n._config.enableTrace), void 0 !== n._config.showDebugInfo && (n.showDebugInfo = n._config.showDebugInfo), !1 !== n._config.showWarnings && (n.showWarnings = !0), "string" == typeof n._config.videoContainerId && (n.remoteVideoContainerId = n._config.videoContainerId), "string" == typeof n._config.remoteVideoContainerId && (n.remoteVideoContainerId = n._config.remoteVideoContainerId), "string" == typeof n._config.localVideoContainerId && (n.localVideoContainerId = n._config.localVideoContainerId), !1 !== n._config.micRequired && (n.micRequired = !0), void 0 !== n._config.videoSupport ? n.videoSupport = n._config.videoSupport : n.videoSupport = !1, void 0 !== n._config.H264first && (n._h264first = n._config.H264first, y.CallManager.get()._h264first = n._h264first), void 0 !== n._config.VP8first && (n._VP8first = n._config.VP8first), void 0 !== n._config.rtcStatsCollectionInterval ? y.CallManager.get().rtcStatsCollectionInterval = n._config.rtcStatsCollectionInterval : y.CallManager.get().rtcStatsCollectionInterval = 1e4, void 0 !== t.getInstance().config().experiments && void 0 !== t.getInstance().config().experiments.rtcStatsInquiryInterval ? y.CallManager.get().rtcStatsInquiryInterval = t.getInstance().config().experiments.rtcStatsInquiryInterval : y.CallManager.get().rtcStatsInquiryInterval = 500, !n._config.protocolVersion || "2" !== n._config.protocolVersion && "3" !== n._config.protocolVersion ? n._callProtocolVersion = "3" : (n._callProtocolVersion = n._config.protocolVersion, y.CallManager.get().setProtocolVersion(n._callProtocolVersion)), n._config.callstatsIoParams && E.CallstatsIo.get(n._config.callstatsIoParams), n._config.prettyPrint && h.LogManager.get().setPrettyPrint(n._config.prettyPrint), n.showWarnings && n.setLogLevelAll(h.LogLevel.WARNING), n.showDebugInfo && n.setLogLevelAll(h.LogLevel.INFO), n.enableTrace && n.setLogLevelAll(h.LogLevel.TRACE), n.logger.info("SDK version: " + n.version), n.logger.info("init(" + JSON.stringify(n._config) + ")"), void 0 !== n._config.videoConstraints) {
                          n.videoConstraints = n._config.videoConstraints;
                          var o = R.default.CameraManager.legacyParamConverter(n._config.videoConstraints);
                          R.default.CameraManager.get().setDefaultVideoSettings(o)
                      }
                      if (R.default.CameraManager.get().getInputDevices().then(function(e) {
                              return n.depLastDevices.vi = e
                          }), R.default.AudioDeviceManager.get().getInputDevices().then(function(e) {
                              return n.depLastDevices.ai = e
                          }), R.default.AudioDeviceManager.get().getOutputDevices().then(function(e) {
                              return n.depLastDevices.ao = e
                          }), "127.0.0.1" != window.location.hostname && "localhost" != window.location.hostname && "https:" != window.location.protocol && void 0 !== console.error && n.showWarnings && n.logger.warning("WARNING: getUserMedia() is deprecated on insecure origins, and support will be removed in the future. You should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details."), n._config.experiments && n._config.experiments.ignorewebrtc) n.RTCsupported = !0;
                      else if ("undefined" != typeof webkitRTCPeerConnection || "undefined" != typeof mozRTCPeerConnection || "undefined" != typeof RTCPeerConnection || "undefined" != typeof RTCIceGatherer)
                          if ("undefined" != typeof mozRTCPeerConnection) try {
                              new mozRTCPeerConnection({
                                  iceServers: []
                              }), n.RTCsupported = !0
                          } catch (e) {} else n.RTCsupported = !0;
                      if (!n.RTCsupported) throw i(new Error("NO_WEBRTC_SUPPORT")), new Error("NO_WEBRTC_SUPPORT");
                      var a;
                      null != window.location.href.match(/^file\:\/{3}.*$/g) && void 0 !== console.error && n.showWarnings && console.error("WebRTC requires application to be loaded from a web server"), n.voxAuth = p.Authenticator.get(), n.voxAuth.setHandler({
                          onLoginSuccessful: function(e, t) {
                              n.loginState = 2;
                              var r = {
                                  name: d.Events.AuthResult,
                                  displayName: e,
                                  result: !0,
                                  tokens: t
                              };
                              n._resolvePromise("login", r), n.dispatchEvent(r)
                          },
                          onLoginFailed: function(e) {
                              n.loginState = 0;
                              var t = {
                                  name: d.Events.AuthResult,
                                  code: e,
                                  result: !1
                              };
                              n._rejectPromise("login", t), n.dispatchEvent(t)
                          },
                          onSecondStageInitiated: function() {
                              var e = {
                                  name: d.Events.AuthResult,
                                  code: 301,
                                  result: !1
                              };
                              n._rejectPromise("login", e), n.dispatchEvent(e)
                          },
                          onOneTimeKeyGenerated: function(e) {
                              var t = {
                                  name: d.Events.AuthResult,
                                  key: e,
                                  code: 302,
                                  result: !1
                              };
                              n._resolvePromise("loginkey", t), n.dispatchEvent(t)
                          },
                          onRefreshTokenFailed: function(e) {
                              var t = {
                                  name: d.Events.RefreshTokenResult,
                                  code: e,
                                  result: !1
                              };
                              n.dispatchEvent(t)
                          },
                          onRefreshTokenSuccess: function(e) {
                              var t = {
                                  name: d.Events.RefreshTokenResult,
                                  tokens: e,
                                  result: !0
                              };
                              n.dispatchEvent(t)
                          }
                      }), n.voxSignaling.addHandler(n), a = setInterval(function() {
                          "undefined" != typeof document && (clearInterval(a), n.dispatchEvent({
                              name: d.Events.SDKReady,
                              version: n.version
                          }), r({
                              name: d.Events.SDKReady,
                              version: n.version
                          }))
                      }, 100), f.VoxSignaling.get().setRPCHandler(_.RemoteEvent.sipRegisterSuccessful, function(e, t) {
                          n.dispatchEvent({
                              name: "SIPRegistrationSuccessful",
                              id: e,
                              sipuri: t
                          })
                      }), f.VoxSignaling.get().setRPCHandler(_.RemoteEvent.onACDStatus, function(e, t, r) {
                          n._config.experiments && n._config.experiments.cleverACD ? T.default.onStatusUpdated(t, r) : n.dispatchEvent({
                              name: d.Events.ACDStatusUpdated,
                              id: e,
                              status: t
                          })
                      }), f.VoxSignaling.get().setRPCHandler(_.RemoteEvent.sipRegisterFailed, function(e, t, r, i) {
                          n.dispatchEvent({
                              name: "SIPRegistrationFailed",
                              id: e,
                              sipuri: t,
                              status: r,
                              reason: i
                          })
                      })
                  })
              }
          }, {
              key: "call",
              value: function(e, t, n, r) {
                  this.logger.info("call(" + e + ", " + JSON.stringify(t) + ")"), g.Utils.checkCA();
                  var i = {
                      H264first: this._h264first,
                      VP8first: this._VP8first
                  };
                  switch (i = "string" == typeof e || "number" == typeof e ? {
                      number: e,
                      video: t,
                      customData: n,
                      extraHeaders: r
                  } : e, c(i.video)) {
                      case "boolean":
                          i.video = {
                              sendVideo: i.video,
                              receiveVideo: i.video
                          };
                          break;
                      case "undefined":
                          i.video = {
                              sendVideo: !1,
                              receiveVideo: !0
                          }
                  }
                  return this.voxCallManager.call(i)
              }
          }, {
              key: "callConference",
              value: function(e, t, n, r) {
                  this.logger.info("callConference(" + e + ", " + JSON.stringify(t) + ")"), g.Utils.checkCA();
                  var i = {
                      H264first: this._h264first,
                      VP8first: this._VP8first
                  };
                  switch (i = "string" == typeof e || "number" == typeof e ? {
                      number: e,
                      video: t,
                      customData: n,
                      extraHeaders: r
                  } : e, c(i.video)) {
                      case "boolean":
                          i.video = {
                              sendVideo: i.video,
                              receiveVideo: i.video
                          };
                          break;
                      case "undefined":
                          i.video = {
                              sendVideo: !1,
                              receiveVideo: !0
                          }
                  }
                  return i.isConference = !0, this.voxCallManager.callConference(i)
              }
          }, {
              key: "config",
              value: function() {
                  return this._config
              }
          }, {
              key: "connect",
              value: function(e) {
                  var t = this;
                  this.logger.info("connect(" + e + ")"), void 0 === this._config && this.logger.warning("Please, run VoxImplant init before connect."), void 0 === e && !1 === this._config.micRequired && (e = !1);
                  var n = null;
                  return new Promise(function(r, i) {
                      var o = function i(o) {
                          n || (n = o), 0 === o.length && t.logger.info("We can't connect to the Voximplant cloud. Please, check UDP connection to Voximplant servers: " + n.join(", "));
                          var a = o.shift();
                          t.logger.info("Trying " + a), t.connectTo(a, null, e).then(function(e) {
                              r(e)
                          }).catch(function() {
                              t.logger.info("Connection to the " + a + " falled"), setTimeout(function() {
                                  return i(o)
                              }, 0)
                          })
                      };
                      t._config.serverIp && "object" === c(t._config.serverIp) ? o(t.serverIp) : t._config.serverIp ? o(t.serverIp.split(";")) : g.Utils.getServers().then(function(e) {
                          return setTimeout(function() {
                              return o(e.split(";"))
                          }, 0)
                      }).catch(function() {
                          return t.dispatchEvent({
                              name: "ConnectionFailed",
                              message: "VoxImplant Cloud is unavailable"
                          })
                      })
                  })
              }
          }, {
              key: "connectTo",
              value: function(e, t, n) {
                  var r = this;
                  return new Promise(function(t, i) {
                      r._connected && i(new Error("ALREADY_CONNECTED_TO_VOXIMPLANT")), r._promises.connect = {
                          resolve: t,
                          reject: i
                      }, r.host = e, r.voxSignaling.connectTo(e, !0, !0, n, r._callProtocolVersion)
                  })
              }
          }, {
              key: "disconnect",
              value: function() {
                  this.logger.info("disconnect()"), this.checkConnection(), this.voxSignaling.disconnect(), R.default.StreamManager.get().clear(), this.voxSignaling.removeRPCHandler(_.RemoteEvent.onCallRemoteFunctionError), this.voxSignaling.removeRPCHandler(_.RemoteEvent.handleError)
              }
          }, {
              key: "setOperatorACDStatus",
              value: function(e) {
                  var t = this;
                  return this.logger.info("setOperatorACDStatus(" + e + ")"), this._config.experiments && this._config.experiments.cleverACD ? T.default.setStatus(e) : new Promise(function(n, r) {
                      g.Utils.checkCA(), Object.values(u.OperatorACDStatuses).includes(e) || r(new Error("Wrong ACD status name " + e)), t.voxSignaling.callRemoteFunction(S.RemoteFunction.setOperatorACDStatus, e, (new b.default).toString()), n()
                  })
              }
          }, {
              key: "getOperatorACDStatus",
              value: function() {
                  var e = this;
                  return this._config.experiments && this._config.experiments.cleverACD ? T.default.getStatus() : new Promise(function(t, n) {
                      g.Utils.checkCA(), e.voxSignaling.callRemoteFunction(S.RemoteFunction.getOperatorACDStatus, (new b.default).toString());
                      var r = function n(r) {
                          t(r.status), e.off(d.Events.ACDStatusUpdated, n)
                      };
                      setTimeout(function() {
                          n(), e.off(d.Events.ACDStatusUpdated, r)
                      }, 5e3), e.on(d.Events.ACDStatusUpdated, r)
                  })
              }
          }, {
              key: "login",
              value: function(e, t, n) {
                  var r = this;
                  return this.logger.info("login(" + e + ", " + (t ? "***" : void 0) + ", {receiveCalls: " + (n && n.receiveCalls) + "})"), this.loginState = 1, new Promise(function(i, o) {
                      r._promises.login = {
                          resolve: i,
                          reject: o
                      }, n = void 0 !== n ? n : {}, r.checkConnection(), r._config.experiments && r._config.experiments.mediaServer && (n.mediaServer = r._config.experiments.mediaServer), r.voxAuth.basicLogin(e, t, n)
                  })
              }
          }, {
              key: "loginWithCode",
              value: function(e, t, n) {
                  var r = this;
                  return this.loginState = 1, new Promise(function(i, o) {
                      r._promises.login = {
                          resolve: i,
                          reject: o
                      }, n = void 0 !== n ? n : {}, n = Object.assign({}, n, {
                          serverPresenceControl: !1
                      }), r.checkConnection(), r.voxAuth.loginStage2(e, t, n)
                  })
              }
          }, {
              key: "loginWithToken",
              value: function(e, t, n) {
                  var r = this;
                  return this.logger.info("loginWithToken(" + e + ", '***', {receiveCalls: " + (n && n.receiveCalls) + "})"), this.loginState = 1, new Promise(function(i, o) {
                      r._promises.login = {
                          resolve: i,
                          reject: o
                      }, n = void 0 !== n ? n : {}, n = Object.assign({}, n, {
                          serverPresenceControl: !1
                      }), n.accessToken = t, r.checkConnection(), r.voxAuth.tokenLogin(e, n)
                  })
              }
          }, {
              key: "tokenRefresh",
              value: function(e, t, n) {
                  var r = this;
                  return this.logger.info("tokenRefresh(" + e + ")"), new Promise(function(i, o) {
                      var a = function e(t) {
                          t.result ? i(t) : o(t), r.off(d.Events.RefreshTokenResult, e)
                      };
                      r.on(d.Events.RefreshTokenResult, a), r.voxAuth.tokenRefresh(e, t, n)
                  })
              }
          }, {
              key: "requestOneTimeLoginKey",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      t._promises.loginkey = {
                          resolve: n,
                          reject: r
                      }, t.checkConnection(), t.voxAuth.generateOneTimeKey(e)
                  })
              }
          }, {
              key: "loginWithOneTimeKey",
              value: function(e, t, n) {
                  var r = this;
                  return this.logger.info("loginWithOneTimeKey(" + e + ", '***' , {receiveCalls: " + (n && n.receiveCalls) + "})"), this.loginState = 1, new Promise(function(i, o) {
                      r._promises.login = {
                          resolve: i,
                          reject: o
                      }, n = void 0 !== n ? n : {}, n = Object.assign({}, n, {
                          serverPresenceControl: !1
                      }), r.checkConnection(), r.voxAuth.loginUsingOneTimeKey(e, t, n)
                  })
              }
          }, {
              key: "connected",
              value: function() {
                  return this._connected
              }
          }, {
              key: "showLocalVideo",
              value: function() {
                  var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                      t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                      n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                  return this.logger.info("showLocalVideo(" + e + ", " + t + ", " + n + ")"), e ? R.default.StreamManager.get().showLocalVideo() : R.default.StreamManager.get().hideLocalVideo()
              }
          }, {
              key: "setLocalVideoPosition",
              value: function(e, t) {
                  throw new Error("Deprecated: please use CSS to position '#voximplantlocalvideo' element")
              }
          }, {
              key: "setLocalVideoSize",
              value: function(e, t) {
                  throw new Error("Deprecated: please use CSS to set size of '#voximplantlocalvideo' element")
              }
          }, {
              key: "setVideoSettings",
              value: function(e, t, n) {
                  R.default.CameraManager.get().setDefaultVideoSettings(R.default.CameraManager.legacyParamConverter(e)), y.CallManager.get().setVideoSettings(e).then(function() {
                      t && t(null)
                  }, function(e) {
                      n && n(null)
                  })
              }
          }, {
              key: "setVideoBandwidth",
              value: function(e) {
                  this.logger.info("setVideoBandwidth(" + e + ")"), this.checkConnection(), m.PCFactory.get().setBandwidthParams(e), this.voxSignaling.callRemoteFunction(S.RemoteFunction.setDesiredVideoBandwidth, e)
              }
          }, {
              key: "playToneScript",
              value: function(e) {
                  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                  this.logger.info("playToneScript('***', " + t + ")"), g.Utils.playToneScript(e, t)
              }
          }, {
              key: "stopPlayback",
              value: function() {
                  this.logger.info("stopPlayback()"), g.Utils.stopPlayback() && this.dispatchEvent({
                      name: d.Events.PlaybackFinished
                  })
              }
          }, {
              key: "volume",
              value: function(e) {
                  return void 0 !== e && (e > 100 && (e = 100), e < 0 && (e = 0), y.CallManager.get().setAllCallsVolume(e), this.level = e), this.level
              }
          }, {
              key: "audioSources",
              value: function() {
                  return this.depLastDevices.ai
              }
          }, {
              key: "videoSources",
              value: function() {
                  return this.depLastDevices.vi
              }
          }, {
              key: "audioOutputs",
              value: function() {
                  return this.depLastDevices.ao
              }
          }, {
              key: "useAudioSource",
              value: function(e, t, n) {
                  var r = R.default.AudioDeviceManager.get().getDefaultAudioSettings();
                  return R.default.AudioDeviceManager.get().setDefaultAudioSettings(Object.assign({}, r, {
                      inputId: e
                  })), new Promise(function(r, i) {
                      return y.CallManager.get().useAudioSource(e).then(function() {
                          t && t(null), r(null)
                      }, function(e) {
                          n && n(e), i(e)
                      })
                  })
              }
          }, {
              key: "useVideoSource",
              value: function(e, t, n) {
                  var r = R.default.CameraManager.get().getDefaultVideoSettings();
                  return R.default.CameraManager.get().setDefaultVideoSettings(Object.assign({}, r, {
                      cameraId: e
                  })), new Promise(function(r, i) {
                      return y.CallManager.get().useVideoSource(e).then(function() {
                          t && t(null), r(null)
                      }, function(e) {
                          n && n(e), i(e)
                      })
                  })
              }
          }, {
              key: "useAudioOutput",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      "chrome" !== v.default.getWSVendor(!0) && r(new Error("Unsupported browser. Only Google Chrome 49 and above.")), t._defaultSinkId = e, n()
                  })
              }
          }, {
              key: "attachRecordingDevice",
              value: function(e, t) {
                  h.LogManager.get().writeMessage(h.LogCategory.CLIENT, "DEPRECATED", h.LogLevel.ERROR, "Now all media connection on demand. There is no reason do it by hand."), e && e(null)
              }
          }, {
              key: "detachRecordingDevice",
              value: function() {
                  R.default.StreamManager.get().clear()
              }
          }, {
              key: "setCallActive",
              value: function(e) {
                  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                  return e.setActive(t)
              }
          }, {
              key: "sendVideo",
              value: function() {
                  !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                  h.LogManager.get().writeMessage(h.LogCategory.CLIENT, "DEPRECATED", h.LogLevel.ERROR, "This function deprecated. Use Call.sendVideo() instead.")
              }
          }, {
              key: "isRTCsupported",
              value: function() {
                  if ("undefined" != typeof webkitRTCPeerConnection || "undefined" != typeof mozRTCPeerConnection || "undefined" != typeof RTCPeerConnection || "undefined" != typeof RTCIceGatherer) {
                      if ("undefined" == typeof mozRTCPeerConnection) return !0;
                      try {
                          return new mozRTCPeerConnection({
                              iceServers: []
                          }), !0
                      } catch (e) {
                          return !1
                      }
                  }
              }
          }, {
              key: "transferCall",
              value: function(e, t) {
                  this.logger.info("transferCall(" + e + ", " + e + ")"), g.Utils.checkCA(), this.voxCallManager.transferCall(e, t)
              }
          }, {
              key: "setLogLevel",
              value: function(e, t) {
                  h.LogManager.get().setLogLevel(e, t)
              }
          }, {
              key: "onSignalingConnected",
              value: function() {
                  this._connected = !0;
                  var e = {
                      name: d.Events.ConnectionEstablished
                  };
                  this._resolvePromise("connect", e), this.dispatchEvent(e)
              }
          }, {
              key: "onSignalingClosed",
              value: function() {
                  this._connected = !1, this.dispatchEvent({
                      name: d.Events.ConnectionClosed
                  }), this.progressTone && this.stopProgressTone()
              }
          }, {
              key: "onSignalingConnectionFailed",
              value: function(e) {
                  this._connected = !1, this._rejectPromise("connect", event)
              }
          }, {
              key: "onMediaConnectionFailed",
              value: function() {}
          }, {
              key: "getCall",
              value: function(e) {
                  return y.CallManager.get().calls[e]
              }
          }, {
              key: "removeCall",
              value: function(e) {
                  y.CallManager.get().removeCall(e)
              }
          }, {
              key: "screenSharingSupported",
              value: function() {
                  return v.default.screenSharingSupported()
              }
          }, {
              key: "addEventListener",
              value: function(e, n) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addEventListener", this).call(this, e, n)
              }
          }, {
              key: "removeEventListener",
              value: function(e, n) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "removeEventListener", this).call(this, e, n)
              }
          }, {
              key: "on",
              value: function(e, n, r) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "on", this).call(this, e, n)
              }
          }, {
              key: "off",
              value: function(e, n) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "off", this).call(this, e, n)
              }
          }, {
              key: "getZingayaAPI",
              value: function() {
                  return new L.ZingayaAPI(this)
              }
          }, {
              key: "registerForPushNotificatuons",
              value: function(e) {
                  return this.logger.info("Deprecated registerForPushNotificatuons()"), M.PushService.register(e)
              }
          }, {
              key: "registerForPushNotifications",
              value: function(e) {
                  return this.logger.info("registerForPushNotifications()"), M.PushService.register(e)
              }
          }, {
              key: "unregisterForPushNotificatuons",
              value: function(e) {
                  return this.logger.info("Deprecated unregisterForPushNotificatuons()"), M.PushService.unregister(e)
              }
          }, {
              key: "unregisterForPushNotifications",
              value: function(e) {
                  return this.logger.info("unregisterForPushNotifications()"), M.PushService.unregister(e)
              }
          }, {
              key: "handlePushNotification",
              value: function(e) {
                  return this.logger.info("handlePushNotification()"), M.PushService.incomingPush(e)
              }
          }, {
              key: "getGUID",
              value: function() {
                  return (new b.default).toString()
              }
          }, {
              key: "enableSilentLogging",
              value: function(e) {
                  h.LogManager.get().shadowLogging = e
              }
          }, {
              key: "clearSilentLog",
              value: function() {
                  h.LogManager.get().clearSilentLog()
              }
          }, {
              key: "getSilentLog",
              value: function() {
                  return h.LogManager.get().getSLog()
              }
          }, {
              key: "setLoggerCallback",
              value: function(e) {
                  h.LogManager.get().setLoggerCallback(e)
              }
          }, {
              key: "getClientState",
              value: function() {
                  var e = this.voxSignaling.currentState;
                  return e == f.VoxSignalingState.CONNECTING || e == f.VoxSignalingState.WSCONNECTED ? h.ClientState.CONNECTING : e == f.VoxSignalingState.CLOSING || e == f.VoxSignalingState.IDLE ? h.ClientState.DISCONNECTED : e == f.VoxSignalingState.CONNECTED ? 1 == this.loginState ? h.ClientState.LOGGING_IN : 2 == this.loginState ? h.ClientState.LOGGED_IN : h.ClientState.CONNECTED : void 0
              }
          }, {
              key: "setSwfColor",
              value: function() {
                  h.LogManager.get().writeMessage(h.LogCategory.CLIENT, "NOT SUPPORTED", h.LogLevel.ERROR, "setSwfColor deprecated, and not supported!")
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "Client"
              }
          }, {
              key: "checkConnection",
              value: function() {
                  if (!this._connected) throw new Error("NOT_CONNECTED_TO_VOXIMPLANT")
              }
          }, {
              key: "_resolvePromise",
              value: function(e, t) {
                  var n = this._promises[e];
                  n && (n.resolve(t), this._promises[e] = void 0)
              }
          }, {
              key: "_rejectPromise",
              value: function(e, t) {
                  var n = this._promises[e];
                  n && (n.reject(t), this._promises[e] = void 0)
              }
          }, {
              key: "setLogLevelAll",
              value: function(e) {
                  var t = h.LogManager.get();
                  Object.keys(h.LogCategory).forEach(function(n) {
                      t.setLogLevel(h.LogCategory[n], e)
                  })
              }
          }, {
              key: "version",
              get: function() {
                  return "4.3.71874"
              }
          }, {
              key: "alreadyInitialized",
              get: function() {
                  return this._alreadyInitialized
              }
          }], [{
              key: "getInstance",
              value: function() {
                  return void 0 === t.instance && (t.instance = new t), t.instance
              }
          }]), t
      }(C.EventTarget);
  l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "playProgressTone", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "stopProgressTone", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "onIncomingCall", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "init", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "call", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "callConference", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "connect", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "connectTo", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "disconnect", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setOperatorACDStatus", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "getOperatorACDStatus", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "login", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "loginWithCode", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "loginWithToken", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "tokenRefresh", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "requestOneTimeLoginKey", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "loginWithOneTimeKey", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "connected", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "showLocalVideo", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setLocalVideoPosition", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setLocalVideoSize", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setVideoSettings", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setVideoBandwidth", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "playToneScript", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "stopPlayback", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "volume", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "audioSources", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "videoSources", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "audioOutputs", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "useAudioSource", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "useVideoSource", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "useAudioOutput", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "attachRecordingDevice", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "detachRecordingDevice", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setCallActive", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "sendVideo", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "isRTCsupported", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "transferCall", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setLogLevel", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "onSignalingConnected", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "onSignalingClosed", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "onSignalingConnectionFailed", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "onMediaConnectionFailed", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "getCall", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "removeCall", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "addEventListener", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "removeEventListener", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "on", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "off", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "checkConnection", null), l([h.LogManager.d_trace(h.LogCategory.CLIENT)], k.prototype, "setLogLevelAll", null), t.Client = k
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s, c = n(0),
      l = n(7),
      u = n(8),
      d = n(6),
      g = n(3),
      f = n(13),
      p = n(18),
      v = n(1);
  ! function(e) {
      e[e.IDLE = 0] = "IDLE", e[e.CONNECTING = 1] = "CONNECTING", e[e.WSCONNECTED = 2] = "WSCONNECTED", e[e.CONNECTED = 3] = "CONNECTED", e[e.CLOSING = 4] = "CLOSING"
  }(s = t.VoxSignalingState || (t.VoxSignalingState = {}));
  var h = function() {
      function e() {
          var t = this;
          r(this, e), this.ver = "3", this.handlers = [], this.rpcHandlers = {}, this.pingTimer = null, this.pongTimer = null, this.manualDisconnect = !1, this.platform = "platform", this.referrer = "platform", this.extra = "", this.closing = !1, this.writeLog = !1, this._opLog = [], this.token = "", this.logger = c.LogManager.get().createLogger(c.LogCategory.SIGNALING, this._traceName()), this.currentState = s.IDLE, this.setRPCHandler(f.RemoteEvent.connectionSuccessful, function(e) {
              t.onConnectionSuccessfulRPC(e)
          }), this.setRPCHandler(f.RemoteEvent.connectionFailed, function() {
              t.onConnectionFailedRPC()
          }), this.setRPCHandler(f.RemoteEvent.createConnection, function(e) {
              t.onConnectionSuccessfulRPC(e)
          })
      }
      return i(e, [{
          key: "addHandler",
          value: function(e) {
              this.handlers.push(e)
          }
      }, {
          key: "close",
          value: function() {
              this.closing = !0, this.ws ? (this.ws.onclose = null, this.ws.close(), this.onWSClosed(null)) : this.logger.warning("Try close unused WS in state " + s[this.currentState])
          }
      }, {
          key: "cleanup",
          value: function() {
              u.PCFactory.get().closeAll(), this.pingTimer && clearTimeout(this.pingTimer), this.pongTimer && clearTimeout(this.pongTimer)
          }
      }, {
          key: "onConnectionSuccessfulRPC",
          value: function(e) {
              if (this.currentState != s.WSCONNECTED) return void this.logger.error("Can't handle __connectionSuccessful while in state " + s[this.currentState]);
              if (e && (this.token = e), this.currentState = s.CONNECTED, this.handlers.length > 0)
                  for (var t = 0; t < this.handlers.length; ++t) try {
                      this.handlers[t].onSignalingConnected()
                  } catch (e) {
                      this.logger.warning("Error in onSignalingConnected callback: " + e)
                  } else this.logger.warning("No VoxSignaling handler specified")
          }
      }, {
          key: "onConnectionFailedRPC",
          value: function() {
              if (this.currentState != s.WSCONNECTED) return void this.logger.error("Can't handle __connectionSuccessful while in state " + s[this.currentState]);
              if (this.ws.onerror = null, this.ws.close(), this.ws = null, this.currentState = s.IDLE, v.Client.getInstance().loginState = 0, this.handlers.length > 0)
                  for (var e = 0; e < this.handlers.length; ++e) try {
                      this.handlers[e].onMediaConnectionFailed()
                  } catch (e) {
                      this.logger.warning("Error in onMediaConnectionFailed callback: " + e)
                  } else this.logger.warning("No VoxSignaling handler specified")
          }
      }, {
          key: "connectTo",
          value: function(e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                  n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                  r = this,
                  i = arguments[3],
                  o = arguments[4];
              if (this.manualDisconnect = !1, this.ver = o, this.currentState != s.IDLE) return void this.logger.error("Can't establish connection while in state " + s[this.currentState]);
              this.currentState = s.CONNECTING;
              var a = l.default.getWSVendor();
              this.ws = new WebSocket("ws" + (n ? "s" : "") + "://" + e + "/" + this.platform + "?version=" + this.ver + "&client=" + a + "&ccheck=" + (void 0 === i || i) + "&referrer=&extra=" + this.extra + "&video=" + (t ? "true" : "false") + "&client_version=" + v.Client.getInstance().version + "&client_platform=" + a + "&im_version=2"), this.ws.onopen = function(e) {
                  return r.onWSConnected()
              }, this.ws.onclose = function(e) {
                  return r.onWSClosed(e)
              }, this.ws.onerror = function(e) {
                  return r.onWSError()
              }, this.ws.onmessage = function(e) {
                  return r.onWSData(e.data)
              }
          }
      }, {
          key: "setRPCHandler",
          value: function(e, t) {
              void 0 !== this.rpcHandlers[e] && this.logger.warning("Overwriting RPC handler for function " + e), this.rpcHandlers[e] = t
          }
      }, {
          key: "removeRPCHandler",
          value: function(e) {
              void 0 !== this.rpcHandlers[e] || this.closing || this.logger.warning("There is no RPC handler for function " + e), delete this.rpcHandlers[e]
          }
      }, {
          key: "callRemoteFunction",
          value: function(e) {
              for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
              if (e !== g.RemoteFunction.ping && this.logger.trace("callRemoteFunction(" + e + ")"), this.currentState != s.CONNECTED && this.currentState != s.WSCONNECTED) return this.closing || this.logger.error("Can't make a RPC call in state " + s[this.currentState]), !1;
              if (void 0 !== this.ws) {
                  this.writeLog && this._opLog.push("send:" + JSON.stringify({
                      name: e,
                      params: n
                  }));
                  var i = JSON.stringify({
                      name: e,
                      params: n
                  });
                  return this.ws.send(i), !0
              }
          }
      }, {
          key: "onWSData",
          value: function(e) {
              this.writeLog && this._opLog.push("recv:" + e);
              var t = void 0;
              try {
                  t = JSON.parse(e)
              } catch (t) {
                  return void this.logger.error("Can't parse JSON data: " + e)
              }
              void 0 !== t.service ? this.onWSMessData(t) : this.onWSVoipData(t)
          }
      }, {
          key: "onWSMessData",
          value: function(e) {
              p.MsgSignaling.get().handleWsData(e)
          }
      }, {
          key: "onWSVoipData",
          value: function(e) {
              var t = e.name,
                  n = e.params;
              if (void 0 !== this.rpcHandlers[t]) try {
                  this.rpcHandlers[t].apply(null, n)
              } catch (e) {
                  this.logger.warning("Error in '" + t + "' handler : " + e)
              } else this.logger.warning("No handler for " + t)
          }
      }, {
          key: "disconnect",
          value: function() {
              this.closing = !0, this.manualDisconnect = !0, this.onWSClosed(null), this.cleanup()
          }
      }, {
          key: "onWSClosed",
          value: function(e) {
              if (this.currentState != s.CONNECTED && this.currentState != s.CONNECTING && this.currentState != s.CLOSING) {
                  if (this.closing) return;
                  this.logger.warning("onWSClosed in state " + s[this.currentState])
              }
              this.ws && (this.ws.close(), this.ws = void 0);
              var t = this.currentState;
              if (this.pingTimer && clearTimeout(this.pingTimer), this.pongTimer && clearTimeout(this.pongTimer), this.cleanup(), this.currentState = s.IDLE, v.Client.getInstance().loginState = 0, this.handlers.length > 0)
                  for (var n = 0; n < this.handlers.length; ++n)
                      if (t != s.CONNECTING && t != s.WSCONNECTED && t != s.IDLE || this.manualDisconnect) try {
                          this.handlers[n].onSignalingClosed()
                      } catch (e) {
                          this.logger.warning("Error in onSignalingClosed callback: " + e)
                      } else try {
                          this.handlers[n].onSignalingConnectionFailed(e.reason)
                      } catch (e) {
                          this.logger.warning("Error in onSignalingConnectionFailed callback: " + e)
                      } else this.logger.warning("No VoxSignaling handler specified")
          }
      }, {
          key: "onWSConnected",
          value: function() {
              var t = this;
              this.closing = !1, this.currentState != s.CONNECTING && this.logger.warning("onWSConnected in state " + s[this.currentState]), this.currentState = s.WSCONNECTED, this.pingTimer = window.setTimeout(function() {
                  return t.doPing()
              }, e.PING_DELAY), this.setRPCHandler(f.RemoteEvent.pong, function() {
                  return t.pongReceived()
              }), this.setRPCHandler(f.RemoteEvent.increaseGain, function() {
                  t.logger.info("Deprecated increaseGain")
              })
          }
      }, {
          key: "onWSError",
          value: function() {
              if (this.currentState != s.CONNECTING && this.logger.warning("onWSError in state " + this.currentState), this.ws.close(), this.ws = void 0, this.pingTimer && clearTimeout(this.pingTimer), this.pongTimer && clearTimeout(this.pongTimer), this.cleanup(), this.currentState = s.IDLE, v.Client.getInstance().loginState = 0, void 0 !== this.handlers)
                  for (var e = 0; e < this.handlers.length; ++e) try {
                      this.handlers[e].onSignalingConnectionFailed("Error connecting to VoxImplant server")
                  } catch (e) {
                      this.logger.warning("Error in onSignalingConnectionFailed callback: " + e)
                  } else this.logger.warning("No VoxSignaling handler specified")
          }
      }, {
          key: "doPing",
          value: function() {
              var t = this;
              this.pingTimer = null, this.callRemoteFunction(g.RemoteFunction.ping, []), this.pongTimer = window.setTimeout(function() {
                  if (d.CallManager.get().numCalls > 0) return void t.pongReceived();
                  t.pongTimer = null;
                  for (var e = 0; e < t.handlers.length; ++e)
                      if (t.currentState == s.CONNECTED) try {
                          t.handlers[e].onSignalingClosed()
                      } catch (e) {
                          t.logger.warning("Error in onSignalingClosed callback: " + e)
                      } else try {
                          t.handlers[e].onSignalingConnectionFailed("Connection closed")
                      } catch (e) {
                          t.logger.warning("Error in onSignalingConnectionFailed callback: " + e)
                      }
                  t.ws.close(), t.currentState = s.IDLE, v.Client.getInstance().loginState = 0
              }, e.PONG_DELAY)
          }
      }, {
          key: "pongReceived",
          value: function() {
              var t = this;
              this.pongTimer && (clearTimeout(this.pongTimer), this.pongTimer = null, this.pingTimer = window.setTimeout(function() {
                  return t.doPing()
              }, e.PING_DELAY))
          }
      }, {
          key: "sendRaw",
          value: function(e) {
              this.writeLog && this._opLog.push("send:" + JSON.stringify(e));
              var t = JSON.stringify(e);
              return this.ws.send(t), c.LogManager.get().writeMessage(c.LogCategory.SIGNALING, "[wsdataout]", c.LogLevel.INFO, t), !0
          }
      }, {
          key: "getLog",
          value: function() {
              return this._opLog
          }
      }, {
          key: "lagacyConnectTo",
          value: function(e, t, n, r) {
              this.ver = "2", this.platform = r, this.referrer = t, this.connectTo(e, !1, !0, !0, "2")
          }
      }, {
          key: "_traceName",
          value: function() {
              return "VoxSignaling"
          }
      }], [{
          key: "get",
          value: function() {
              return void 0 === this.inst && (this.inst = new e), this.inst
          }
      }]), e
  }();
  h.PING_DELAY = 1e4, h.PONG_DELAY = 1e4, a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "addHandler", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "close", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "cleanup", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "onConnectionSuccessfulRPC", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "onConnectionFailedRPC", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "connectTo", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "setRPCHandler", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "removeRPCHandler", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "disconnect", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "onWSClosed", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "onWSConnected", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "onWSError", null), a([c.LogManager.d_trace(c.LogCategory.SIGNALING)], h.prototype, "sendRaw", null), t.VoxSignaling = h
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.ping = "__ping"] = "ping", e[e.login = "login"] = "login", e[e.loginGenerateOneTimeKey = "loginGenerateOneTimeKey"] = "loginGenerateOneTimeKey", e[e.loginStage2 = "loginStage2"] = "loginStage2", e[e.setOperatorACDStatus = "setOperatorACDStatus"] = "setOperatorACDStatus", e[e.getOperatorACDStatus = "getOperatorACDStatus"] = "getOperatorACDStatus", e[e.setDesiredVideoBandwidth = "setDesiredVideoBandwidth"] = "setDesiredVideoBandwidth", e[e.rejectCall = "rejectCall"] = "rejectCall", e[e.disconnectCall = "disconnectCall"] = "disconnectCall", e[e.sendDTMF = "sendDTMF"] = "sendDTMF", e[e.sendSIPInfo = "sendSIPInfo"] = "sendSIPInfo", e[e.hold = "hold"] = "hold", e[e.unhold = "unhold"] = "unhold", e[e.acceptCall = "acceptCall"] = "acceptCall", e[e.createCall = "createCall"] = "createCall", e[e.callConference = "callConference"] = "callConference", e[e.transferCall = "transferCall"] = "transferCall", e[e.muteLocal = "__muteLocal"] = "muteLocal", e[e.reInvite = "ReInvite"] = "reInvite", e[e.acceptReInvite = "AcceptReInvite"] = "acceptReInvite", e[e.rejectReInvite = "RejectReInvite"] = "rejectReInvite", e[e.confirmPC = "__confirmPC"] = "confirmPC", e[e.addCandidate = "__addCandidate"] = "addCandidate", e[e.loginUsingOneTimeKey = "loginUsingOneTimeKey"] = "loginUsingOneTimeKey", e[e.refreshOauthToken = "refreshOauthToken"] = "refreshOauthToken", e[e.zPromptFinished = "promptFinished"] = "zPromptFinished", e[e.zStartPreFlightCheck = "__startPreFlightCheck"] = "zStartPreFlightCheck", e[e.registerPushToken = "registerPushToken"] = "registerPushToken", e[e.unregisterPushToken = "unregisterPushToken"] = "unregisterPushToken", e[e.pushFeedback = "pushFeedback"] = "pushFeedback", e[e.refreshIceConfig = "refreshIceConfig"] = "refreshIceConfig"
  }(t.RemoteFunction || (t.RemoteFunction = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var a, s = n(50);
  ! function(e) {
      ! function(e) {
          e[e.DevicesUpdated = "DevicesUpdated"] = "DevicesUpdated", e[e.MediaRendererAdded = "MediaRendererAdded"] = "MediaRendererAdded", e[e.MediaRendererRemoved = "MediaRendererRemoved"] = "MediaRendererRemoved", e[e.BeforeMediaRendererRemoved = "BeforeMediaRendererRemoved"] = "BeforeMediaRendererRemoved"
      }(e.HardwareEvents || (e.HardwareEvents = {}));
      ! function(e) {
          e[e.VIDEO_QUALITY_HIGH = "video_quality_high"] = "VIDEO_QUALITY_HIGH", e[e.VIDEO_QUALITY_LOW = "video_quality_low"] = "VIDEO_QUALITY_LOW", e[e.VIDEO_QUALITY_MEDIUM = "video_quality_medium"] = "VIDEO_QUALITY_MEDIUM", e[e.VIDEO_SIZE_QQVGA = "video_size_qqvga"] = "VIDEO_SIZE_QQVGA", e[e.VIDEO_SIZE_QCIF = "video_size_qcif"] = "VIDEO_SIZE_QCIF", e[e.VIDEO_SIZE_QVGA = "video_size_qvga"] = "VIDEO_SIZE_QVGA", e[e.VIDEO_SIZE_CIF = "video_size_cif"] = "VIDEO_SIZE_CIF", e[e.VIDEO_SIZE_nHD = "video_size_nhd"] = "VIDEO_SIZE_nHD", e[e.VIDEO_SIZE_VGA = "video_size_vga"] = "VIDEO_SIZE_VGA", e[e.VIDEO_SIZE_SVGA = "video_size_svga"] = "VIDEO_SIZE_SVGA", e[e.VIDEO_SIZE_HD = "video_size_hd"] = "VIDEO_SIZE_HD", e[e.VIDEO_SIZE_UXGA = "video_size_uxga"] = "VIDEO_SIZE_UXGA", e[e.VIDEO_SIZE_FHD = "video_size_fhd"] = "VIDEO_SIZE_FHD", e[e.VIDEO_SIZE_UHD = "video_size_uhd"] = "VIDEO_SIZE_UHD"
      }(e.VideoQuality || (e.VideoQuality = {}));
      var t = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(s.AudioDeviceManager);
      e.AudioDeviceManager = t;
      var n = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(s.CameraManager);
      e.CameraManager = n;
      var a = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(s.StreamManager);
      e.StreamManager = a;
      var c = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(s.IOSCacheManager);
      e.IOSCacheManager = c
  }(a = t.Hardware || (t.Hardware = {})), t.default = a
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.Connected = "Connected"] = "Connected", e[e.Disconnected = "Disconnected"] = "Disconnected", e[e.Failed = "Failed"] = "Failed", e[e.ProgressToneStart = "ProgressToneStart"] = "ProgressToneStart", e[e.ProgressToneStop = "ProgressToneStop"] = "ProgressToneStop", e[e.MessageReceived = "onSendMessage"] = "MessageReceived", e[e.InfoReceived = "InfoReceived"] = "InfoReceived", e[e.TransferComplete = "TransferComplete"] = "TransferComplete", e[e.TransferFailed = "TransferFailed"] = "TransferFailed", e[e.ICETimeout = "ICETimeout"] = "ICETimeout", e[e.RTCStatsReceived = "RTCStatsReceived"] = "RTCStatsReceived", e[e.CallStatsReceived = "CallStatsReceived"] = "CallStatsReceived", e[e.MediaElementCreated = "MediaElementCreated"] = "MediaElementCreated", e[e.MediaElementRemoved = "MediaElementRemoved"] = "MediaElementRemoved", e[e.ICECompleted = "ICECompleted"] = "ICECompleted", e[e.Updated = "Updated"] = "Updated", e[e.PendingUpdate = "PendingUpdate"] = "PendingUpdate", e[e.UpdateFailed = "UpdateFailed"] = "UpdateFailed", e[e.LocalVideoStreamAdded = "LocalVideoStreamAdded"] = "LocalVideoStreamAdded", e[e.EndpointAdded = "EndpointAdded"] = "EndpointAdded", e[e.StateUpdated = "StateUpdated"] = "StateUpdated", e[e.ActiveUpdated = "ActiveUpdated"] = "ActiveUpdated", e[e.QualityIssueCodecMismatch = "QualityIssueCodecMismatch"] = "QualityIssueCodecMismatch", e[e.QualityIssueHighMediaLatency = "QualityIssueHighMediaLatency"] = "QualityIssueHighMediaLatency", e[e.QualityIssueICEDisconnected = "QualityIssueICEDisconnected"] = "QualityIssueICEDisconnected", e[e.QualityIssueLocalVideoDegradation = "QualityIssueLocalVideoDegradation"] = "QualityIssueLocalVideoDegradation", e[e.QualityIssueLowBandwidth = "QualityIssueLowBandwidth"] = "QualityIssueLowBandwidth", e[e.QualityIssueNoAudioSignal = "QualityIssueNoAudioSignal"] = "QualityIssueNoAudioSignal", e[e.QualityIssuePacketLoss = "QualityIssuePacketLoss"] = "QualityIssuePacketLoss"
  }(t.CallEvents || (t.CallEvents = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(12),
      c = n(5),
      l = n(2),
      u = n(20),
      d = n(11),
      g = n(10),
      f = n(0),
      p = n(8),
      v = n(1),
      h = n(22),
      m = n(54),
      y = n(3),
      C = n(13),
      S = n(55),
      _ = n(17),
      E = n(56),
      L = n(16),
      M = n(23),
      b = n(4),
      R = n(57),
      T = function() {
          function e() {
              var t = this;
              r(this, e), this.protocolVersion = "3", this._h264first = !1, this.iceServers = {}, this._calls = {}, this.callStats = R.CallStatsManager.get(), this.voxSignaling = l.VoxSignaling.get(), this.logger = f.LogManager.get().createLogger(f.LogCategory.SIGNALING, this._traceName()), this.voxSignaling.addHandler(this), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleIncomingConnection, function(e, n, r, i, o) {
                  t.handleIncomingConnection(e, n, r, i, o)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.onICEConfig, function(e, n) {
                  t.onICEResult(e, !0, n)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.onICEConfigFailed, function(e) {
                  t.onICEResult(e, !1)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleConnectionConnected, function(e, n, r, i) {
                  t.handleConnectionConnected(e, n, r)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleConnectionDisconnected, function(e, n, r) {
                  t.handleConnectionDisconnected(e, n, r)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleRingOut, function(e) {
                  t.handleRingOut(e)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.stopRinging, function(e) {
                  t.stopRinging(e)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleConnectionFailed, function(e, n, r, i) {
                  t.handleConnectionFailed(e, n, r, i)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleSIPInfo, function(e, n, r, i, o) {
                  t.handleSIPInfo(e, n, r, i, o)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleSipEvent, function(e) {
                  t.handleSipEvent(e)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleTransferStarted, function(e) {
                  t.handleTransferStarted(e)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleTransferComplete, function(e) {
                  t.handleTransferComplete(e)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleTransferFailed, function(e) {
                  t.handleTransferFailed(e)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleReInvite, function(e, n, r, i) {
                  var o = JSON.parse(i);
                  t.handleInReinvite(e, n, r, o)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleAcceptReinvite, function(e, n, r) {
                  t.handleReinvite(e, n, r)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.handleRejectReinvite, function(e, n, r) {
                  t.handleRejectReinvite(e, n, r)
              }), this.voxSignaling.setRPCHandler(C.RemoteEvent.startEarlyMedia, function(e, n, r) {
                  t.startEarlyMedia(e, n, r)
              })
          }
          return i(e, [{
              key: "call",
              value: function(t) {
                  var n = this,
                      r = {
                          number: null,
                          video: {
                              sendVideo: !1,
                              receiveVideo: !1
                          },
                          customData: null,
                          extraHeaders: {},
                          wiredLocal: !0,
                          wiredRemote: !0,
                          H264first: this._h264first,
                          VP8first: !1,
                          forceActive: !1,
                          extraParams: {}
                      },
                      i = u.Utils.mixObjectToLeft(r, t);
                  i = e.addCustomDataToHeaders(i);
                  var o = u.Utils.generateUUID();
                  if (this._calls[o]) throw this.logger.error("Call " + o + " already exists"), new Error("Internal error");
                  var a = this.getCallInstance(o, d.Authenticator.get().displayName, !1, i);
                  _.CallstatsIo.isModuleEnabled() && (i.extraHeaders[g.Constants.CALLSTATSIOID_HEADER] = o), i.VP8first && (a.rearangeCodecs = E.CodecSorterHelpers.VP8Sorter), i.H264first && (a.rearangeCodecs = E.CodecSorterHelpers.H264Sorter);
                  var s = !1;
                  return a.settings.active = !0, Object.keys(this._calls).length > 1 && !i.forceActive && (a.setActiveForce(!1), s = !0), void 0 === i.extraHeaders[g.Constants.DIRECT_CALL_HEADER] && "2" == this.protocolVersion ? this.voxSignaling.callRemoteFunction(y.RemoteFunction.createCall, -1, i.number, i.video, o, null, null, i.extraHeaders, i.extraParams) : p.PCFactory.get().setupDirectPC(o, h.PeerConnectionMode.P2P, t.video, s).then(function(e) {
                      a.peerConnection = p.PCFactory.get().peerConnections[o];
                      var t = {
                          tracks: a.peerConnection.getTrackKind()
                      };
                      n.voxSignaling.callRemoteFunction(y.RemoteFunction.createCall, -1, i.number, !0, o, null, null, i.extraHeaders, "", e.sdp, t)
                  }).catch(function(e) {
                      n.handleConnectionFailed(a.id(), 403, "Media access denied", {})
                  }), a.sendVideo(i.video.sendVideo), a
              }
          }, {
              key: "callConference",
              value: function(t) {
                  var n = this,
                      r = {
                          number: null,
                          video: {
                              sendVideo: !1,
                              receiveVideo: !1
                          },
                          customData: null,
                          extraHeaders: {},
                          wiredLocal: !0,
                          wiredRemote: !0,
                          H264first: this._h264first,
                          VP8first: !1,
                          forceActive: !1,
                          extraParams: {}
                      },
                      i = u.Utils.mixObjectToLeft(r, t);
                  i = e.addCustomDataToHeaders(i);
                  var o = u.Utils.generateUUID();
                  if (this._calls[o]) throw this.logger.error("Call " + o + " already exists"), new Error("Internal error");
                  var a = this.getCallInstance(o, d.Authenticator.get().displayName, !1, i);
                  _.CallstatsIo.isModuleEnabled() && (i.extraHeaders[g.Constants.CALLSTATSIOID_HEADER] = o), i.VP8first && (a.rearangeCodecs = E.CodecSorterHelpers.VP8Sorter), i.H264first && (a.rearangeCodecs = E.CodecSorterHelpers.H264Sorter);
                  var s = !1;
                  return a.settings.active = !0, a.settings.isConference = !0, Object.keys(this._calls).length > 1 && !i.forceActive && (a.setActiveForce(!1), s = !0), p.PCFactory.get().setupDirectPC(o, h.PeerConnectionMode.CONFERENCE, t.video, s).then(function(e) {
                      a.peerConnection = p.PCFactory.get().peerConnections[o];
                      var t = {
                          tracks: a.peerConnection.getTrackKind()
                      };
                      n.voxSignaling.callRemoteFunction(y.RemoteFunction.callConference, -1, i.number, !0, o, null, null, i.extraHeaders, "", e.sdp, t)
                  }).catch(function(e) {
                      n.handleConnectionFailed(a.id(), 403, "Media access denied", {})
                  }), a.sendVideo(i.video.sendVideo), a
              }
          }, {
              key: "isSDPHasVideo",
              value: function(e) {
                  var t = e.indexOf("m=video");
                  if (-1 === t) return !1;
                  var n = e.indexOf("a=sendrecv", t),
                      r = e.indexOf("a=sendonly", t),
                      i = e.indexOf("m=", t);
                  return -1 !== n && (n < i || -1 === i) || -1 !== r && (r < i || -1 === i)
              }
          }, {
              key: "handleConnectionFailed",
              value: function(e, t, n, r) {
                  var i = this.findCall(e, "handleConnectionFailed");
                  void 0 !== i && (this.removeCall(e), v.Client.getInstance().stopProgressTone(), i.onFailed(t, n, r))
              }
          }, {
              key: "onSignalingConnected",
              value: function() {}
          }, {
              key: "onSignalingClosed",
              value: function() {
                  for (var e in this._calls) this._calls.hasOwnProperty(e) && (this._calls[e].hangup(), this._calls[e].onFailed(409, "Connection Closed", {}))
              }
          }, {
              key: "onSignalingConnectionFailed",
              value: function(e) {}
          }, {
              key: "onMediaConnectionFailed",
              value: function() {}
          }, {
              key: "transferCall",
              value: function(e, t) {
                  for (var n = [e, t], r = 0; r < n.length; r++) {
                      var i = this._calls[n[r].id()];
                      if (!i) return void this.logger.error("trying to transfer unknown call " + i.id());
                      if (i.stateValue != s.CallState.CONNECTED) return void this.logger.error("trying to transfer call " + i.id() + " in state " + i.state())
                  }
                  this.voxSignaling.callRemoteFunction(y.RemoteFunction.transferCall, e.id(), t.id())
              }
          }, {
              key: "removeCall",
              value: function(e) {
                  this.callStats.deleteCall(this._calls[e]), delete this._calls[e]
              }
          }, {
              key: "setProtocolVersion",
              value: function(e) {
                  this.protocolVersion = e
              }
          }, {
              key: "setAllCallsVolume",
              value: function(e) {
                  for (var t in this._calls) this._calls.hasOwnProperty(t) && M.EndpointManager.get().setCallVolume(this._calls[t], e)
              }
          }, {
              key: "useVideoSource",
              value: function(e) {
                  var t = this,
                      n = Object.keys(this._calls).length;
                  return new Promise(function(r, i) {
                      for (var o in t._calls)
                          if (t._calls.hasOwnProperty(o)) {
                              var a = t._calls[o];
                              b.default.CameraManager.get().setCallVideoSettings(a, Object.assign({}, b.default.CameraManager.get().getCallVideoSettings(a), {
                                  cameraId: e
                              })), b.default.StreamManager.get().updateCallStream(a).then(function(e) {
                                  --n <= 0 && r()
                              }, function(e) {
                                  i(e)
                              })
                          }
                  })
              }
          }, {
              key: "setVideoSettings",
              value: function(e) {
                  var t = this,
                      n = Object.keys(this._calls).length;
                  return new Promise(function(r, i) {
                      0 === n && r();
                      for (var o in t._calls)
                          if (t._calls.hasOwnProperty(o)) {
                              var a = t._calls[o];
                              b.default.CameraManager.get().setCallVideoSettings(a, b.default.CameraManager.legacyParamConverter(e)).then(function(e) {
                                  --n <= 0 && r()
                              }, function(e) {
                                  i(e)
                              })
                          }
                  })
              }
          }, {
              key: "useAudioSource",
              value: function(e) {
                  var t = this,
                      n = Object.keys(this._calls).length;
                  return new Promise(function(r, i) {
                      0 === n && r();
                      for (var o in t._calls)
                          if (t._calls.hasOwnProperty(o)) {
                              var a = t._calls[o];
                              b.default.AudioDeviceManager.get().setCallAudioSettings(a, Object.assign({}, b.default.AudioDeviceManager.get().getCallAudioSettings(a), {
                                  inputId: e
                              })).then(function(e) {
                                  --n <= 0 && r()
                              }, function(e) {
                                  i(e)
                              })
                          }
                  })
              }
          }, {
              key: "handleIncomingConnection",
              value: function(e, t, n, r, i) {
                  if (this._calls[e]) throw this.logger.error("Call " + e + " already exists"), new Error("Internal error");
                  var o = L.SDPMuggle.detectDirections(i),
                      a = o.some(function(e) {
                          return "video" === e.type && ("sendonly" === e.direction || "sendrecv" === e.direction)
                      }),
                      s = {
                          number: t,
                          extraHeaders: r,
                          video: a,
                          wiredLocal: !0,
                          wiredRemote: !0,
                          forceActive: !1
                      },
                      c = this.getCallInstance(e, n, !0, s);
                  this._h264first && (c.rearangeCodecs = E.CodecSorterHelpers.H264Sorter);
                  var l = !1;
                  if (c.settings.active = !0, Object.keys(this._calls).length > 1 && (c.setActiveForce(!1), l = !0), v.Client.getInstance().onIncomingCall(e, t, n, r, this.isSDPHasVideo(i)), void 0 === s.extraHeaders[g.Constants.DIRECT_CALL_HEADER] && "2" == this.protocolVersion) c.peerConnection = p.PCFactory.get().getPeerConnect(e);
                  else {
                      var u = []; - 1 === i.indexOf("VIMS") && (u = this.iceServers[e]), p.PCFactory.get().incomeDirectPC(e, {
                          receiveVideo: !0,
                          sendVideo: !0
                      }, i, l, u).then(function(e) {
                          c.peerConnection = e
                      })
                  }
              }
          }, {
              key: "getCallInstance",
              value: function(e, t, n, r) {
                  var i = void 0;
                  return i = "3" == this.protocolVersion ? new S.CallExMedia(e, t, n, r) : void 0 !== r.extraHeaders[g.Constants.DIRECT_CALL_HEADER] ? new S.CallExMedia(e, t, n, r) : new m.CallExServer(e, t, n, r), this._calls[e] = i, this.callStats.addCall(i), M.EndpointManager.get().registerCall(i), i
              }
          }, {
              key: "findCall",
              value: function(e, t) {
                  var n = this._calls[e];
                  return "" === e && (n = this._calls[Object.keys(this._calls)[0]]), void 0 === n ? ("onICEResult" !== t && this.logger.warning("Received " + t + " for unknown call " + e), null) : n
              }
          }, {
              key: "handleRingOut",
              value: function(e) {
                  var t = this.findCall(e, "handleRingOut");
                  void 0 !== t && (v.Client.getInstance().playProgressTone(!0), t.onRingOut(), t.canStartSendingCandidates())
              }
          }, {
              key: "handleConnectionConnected",
              value: function(e, t, n) {
                  this.logger.info("handleConnectionConnected(), received SDP: \n" + n);
                  var r = this.findCall(e, "handleConnectionConnected");
                  if (r.signalingConnected = !0, r.canStartSendingCandidates(), void 0 !== r && (r.onConnected(t, n), void 0 !== n && n.length > 0)) {
                      var i = n.indexOf("m=video");
                      if (-1 !== i) {
                          var o = n.indexOf("a=sendrecv", i),
                              a = n.indexOf("a=sendonly", i),
                              s = n.indexOf("a=recvonly", i),
                              c = n.indexOf("a=inactive", i); - 1 === o && -1 === a && -1 === s && -1 === c && (n += "a=inactive\r\n")
                      }
                      r.peerConnection.processRemoteAnswer(t, n)
                  }
              }
          }, {
              key: "onICEResult",
              value: function(e, t, n) {
                  if (t) {
                      this.iceServers[e] = n;
                      var r = this.findCall(e, "onICEResult");
                      r && r.peerConnection.setConfiguration(Object.assign({}, r.peerConnection.getConfiguration(), {
                          iceServers: n
                      }))
                  }
              }
          }, {
              key: "startEarlyMedia",
              value: function(e, t, n) {
                  this.logger.info("startEarlyMedia(), received SDP: \n" + n);
                  var r = this.findCall(e, "startEarlyMedia");
                  r.settings.hasEarlyMedia = !0, void 0 !== n && r.peerConnection.processRemoteAnswer(t, n), v.Client.getInstance().stopProgressTone()
              }
          }, {
              key: "handleConnectionDisconnected",
              value: function(e, t, n) {
                  var r = this,
                      i = this.findCall(e, "handleConnectionDisconnected");
                  i && (v.Client.getInstance().stopProgressTone(), i.onDisconnected(t, n).then(function() {
                      return r.removeCall(e)
                  }).catch(function(t) {
                      r.logger.error("Can't remove the call " + e + ": " + t.message)
                  }))
              }
          }, {
              key: "handleSIPInfo",
              value: function(e, t, n, r, i) {
                  var o = this.findCall(e, "handleSIPInfo");
                  void 0 !== o && o.onInfo(o, t, n, r, i)
              }
          }, {
              key: "stopRinging",
              value: function(e) {
                  var t = this.findCall(e, "stopRinging");
                  t.canStartSendingCandidates(), void 0 !== t && (v.Client.getInstance().stopProgressTone(), t.onStopRinging())
              }
          }, {
              key: "handleSipEvent",
              value: function(e) {}
          }, {
              key: "handleTransferStarted",
              value: function(e) {}
          }, {
              key: "handleTransferComplete",
              value: function(e) {
                  var t = this.findCall(e, "handleTransferComplete");
                  void 0 !== t && t.onTransferComplete()
              }
          }, {
              key: "handleTransferFailed",
              value: function(e) {
                  var t = this.findCall(e, "handleTransferFailed");
                  void 0 !== t && t.onTransferFailed()
              }
          }, {
              key: "handleReinvite",
              value: function(e, t, n) {
                  var r = this.findCall(e, "handleReinvite");
                  if (void 0 !== r) {
                      var i = this.isSDPHasVideo(n);
                      r.peerConnection.handleReinvite(t, n, i)
                  }
              }
          }, {
              key: "handleRejectReinvite",
              value: function(e, t, n) {
                  var r = this.findCall(e, "handleReinvite");
                  void 0 !== r && r.dispatchEvent({
                      code: 20,
                      call: r
                  })
              }
          }, {
              key: "handleInReinvite",
              value: function(e, t, n, r) {
                  var i = this.findCall(e, "handleReinvite");
                  void 0 !== i && (M.EndpointManager.get().setEndpointDescription(i, r), this.logger.info("handleInReinvite(), received SDP: \n" + n), i.runIncomingReInvite(t, n), i.dispatchEvent({
                      name: c.CallEvents.PendingUpdate,
                      result: !0,
                      call: i
                  }))
              }
          }, {
              key: "recalculateNumCalls",
              value: function() {
                  this._numCalls = 0;
                  for (var e in this._calls) this._calls.hasOwnProperty(e) && this._numCalls++
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "CallManager"
              }
          }, {
              key: "calls",
              get: function() {
                  return this._calls
              }
          }, {
              key: "numCalls",
              get: function() {
                  return this._numCalls
              }
          }], [{
              key: "get",
              value: function() {
                  return void 0 === this.inst && (this.inst = new e), this.inst
              }
          }, {
              key: "cleanHeaders",
              value: function(e) {
                  var t = {};
                  for (var n in e) "X-" != n.substring(0, 2) && n != g.Constants.CALL_DATA_HEADER || (t[n] = e[n]);
                  return t
              }
          }, {
              key: "addCustomDataToHeaders",
              value: function(e) {
                  return void 0 !== e.customData && (void 0 === e.extraHeaders && (e.extraHeaders = {}), e.extraHeaders["VI-CallData"] = e.customData), e
              }
          }]), e
      }();
  a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "call", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleConnectionFailed", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "onSignalingConnected", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "onSignalingClosed", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "onSignalingConnectionFailed", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "removeCall", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "setAllCallsVolume", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "useVideoSource", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "setVideoSettings", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "useAudioSource", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleIncomingConnection", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "findCall", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleRingOut", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleConnectionConnected", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "onICEResult", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleConnectionDisconnected", null), a([f.LogManager.d_trace(f.LogCategory.CALLEXSERVER)], T.prototype, "handleSIPInfo", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "stopRinging", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleSipEvent", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleTransferStarted", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleTransferComplete", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleTransferFailed", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleReinvite", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleRejectReinvite", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T.prototype, "handleInReinvite", null), a([f.LogManager.d_trace(f.LogCategory.CALLMANAGER)], T, "addCustomDataToHeaders", null), t.CallManager = T
}, function(e, t, n) {
  "use strict";
  var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
  } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var i, o = n(0),
      a = n(47),
      s = n(48),
      c = n(49),
      l = n(60),
      u = n(21),
      d = n(61),
      g = n(1),
      f = n(62),
      p = n(63);
  ! function(e) {
      function t(e, t, n) {
          var i = e;
          return "object" != (void 0 === i ? "undefined" : r(i)) && (i = {}), i[t] = {
              ideal: n
          }, i
      }

      function n(e, t, n, r) {
          switch (o.LogManager.get().writeMessage(o.LogCategory.RTC, "Core", o.LogLevel.INFO, "Create WebRTC on the " + JSON.stringify(b)), M) {
              case L.Firefox:
                  return new c.WebRTCPC(e, t, n, r);
              case L.Webkit:
                  var i = b.getBrowserVersion().split("."),
                      a = parseInt(i[0]);
                  return !isNaN(a) && a >= 72 ? new p.TransreceiverPC(e, t, n, r) : new c.WebRTCPC(e, t, n, r);
              case L.Safari:
              case L.Edge:
                  return new c.WebRTCPC(e, t, n, r);
              default:
                  return o.LogManager.get().writeMessage(o.LogCategory.RTC, "Core", o.LogLevel.INFO, "Unsupported browser " + navigator.userAgent), null
          }
      }

      function i() {
          return !(!g.Client.getInstance().config().experiments || !g.Client.getInstance().config().experiments.emulate_ios) || (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
      }

      function v() {
          return M === L.Firefox || M === L.Webkit
      }

      function h(e) {
          return this.logger.info("[constraints]: " + JSON.stringify(e)), navigator.mediaDevices.getUserMedia(e)
      }

      function m(e, t) {
          return new u.SignalingDTMFSender(t)
      }

      function y() {
          return new Promise(function(e) {
              e(!1)
          })
      }

      function C(e) {
          var n = !1,
              r = !1;
          return e.audioEnabled && (n = !0, e.audioInputId && (n = t(n, "deviceId", e.audioInputId))), e.videoEnabled && (r = !0, e.videoSettings && (r = e.videoSettings), e.videoInputId && (r = t(r, "deviceId", e.videoInputId))), {
              peerIdentity: null,
              audio: n,
              video: r
          }
      }

      function S() {
          if (!1 === (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0])) return "voxmobile";
          switch (M || _(), M) {
              case L.Firefox:
                  return "firefox";
              case L.Webkit:
                  return "chrome";
              case L.Safari:
                  return "safari";
              case L.Edge:
                  return "edge";
              default:
                  return ""
          }
      }

      function _() {
          navigator.mozGetUserMedia ? M = L.Firefox : navigator.webkitGetUserMedia ? M = L.Webkit : navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? M = L.Edge : navigator.getUserMedia && (M = L.Safari)
      }

      function E() {
          switch (M || _(), M && o.LogManager.get().writeMessage(o.LogCategory.RTC, "Core", o.LogLevel.INFO, "Detected browser " + L[M]), e.getUserMedia = h, e.getDTMFSender = m, e.screenSharingSupported = y, M) {
              case L.Firefox:
                  e.attachMedia = a.FF.attachStream, e.detachMedia = a.FF.detachStream, e.getScreenMedia = a.FF.getScreenMedia, e.getRTCStats = a.FF.getRTCStats, e.getUserMedia = a.FF.getUserMedia, e.screenSharingSupported = a.FF.screenSharingSupported, e.getDTMFSender = a.FF.getDTMFSender;
                  break;
              case L.Webkit:
                  e.attachMedia = s.Webkit.attachStream, e.detachMedia = s.Webkit.detachStream, e.getScreenMedia = s.Webkit.getScreenMedia, e.getRTCStats = s.Webkit.getRTCStats, e.getUserMedia = s.Webkit.getUserMedia, e.screenSharingSupported = s.Webkit.screenSharingSupported, e.getDTMFSender = s.Webkit.getDTMFSender;
                  break;
              case L.Safari:
                  e.attachMedia = d.Safari.attachStream, e.detachMedia = d.Safari.detachStream, e.getScreenMedia = d.Safari.getScreenMedia, e.getRTCStats = d.Safari.getRTCStats, e.getUserMedia = a.FF.getUserMedia, e.getDTMFSender = d.Safari.getDTMFSender;
                  break;
              case L.Edge:
                  e.attachMedia = l.Edge.attachStream, e.detachMedia = l.Edge.detachStream, e.getScreenMedia = l.Edge.getScreenMedia, e.screenSharingSupported = l.Edge.screenSharingSupported, e.getRTCStats = l.Edge.getRTCStats;
                  break;
              default:
                  o.LogManager.get().writeMessage(o.LogCategory.RTC, "Core", o.LogLevel.INFO, "Unsupported browser " + navigator.userAgent)
          }
          e.composeConstraints = C
      }
      var L = void 0;
      ! function(e) {
          e[e.Firefox = 1] = "Firefox", e[e.Webkit = 2] = "Webkit", e[e.Edge = 3] = "Edge", e[e.Safari = 4] = "Safari"
      }(L || (L = {}));
      var M = void 0,
          b = f.getParser(window.navigator.userAgent);
      e.peerConnectionFactory = n, e.isIphone = i, e.isScreenSharingSupported = v, e.getWSVendor = S, e.init = E
  }(i || (i = {})), t.default = i
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(22),
      c = n(2),
      l = n(0),
      u = n(6),
      d = n(12),
      g = n(7),
      f = n(3),
      p = n(13),
      v = n(1),
      h = n(4),
      m = n(16),
      y = function() {
          function e() {
              var t = this;
              r(this, e), this.iceConfig = null, this._peerConnections = {}, this.waitingPeerConnections = {}, this.logger = l.LogManager.get().createLogger(l.LogCategory.RTC, this._traceName()), this._requireMedia = !0, "firefox" === g.default.getWSVendor() && (e.hasTransceivers = !0), c.VoxSignaling.get().setRPCHandler(p.RemoteEvent.createPC, function(e, n) {
                  t.rpcHandlerCreatePC(e, n)
              }), c.VoxSignaling.get().setRPCHandler(p.RemoteEvent.destroyPC, function(e) {
                  t.rpcHandlerDestroyPC(e)
              }), c.VoxSignaling.get().addHandler(this)
          }
          return i(e, [{
              key: "setupDirectPC",
              value: function(e, t, n, r) {
                  var i = this,
                      o = g.default.peerConnectionFactory(e, t, n);
                  o.setHoldKey(r);
                  var a = (v.Client.getInstance().config(), h.default.StreamManager.get()),
                      s = u.CallManager.get().calls[e];
                  return a.getCallStream(s).then(function(t) {
                      return null !== t && o.fastAddCustomMedia(t), i._peerConnections[e] = o, o.getLocalOffer()
                  })
              }
          }, {
              key: "incomeDirectPC",
              value: function(e, t, n, r, i) {
                  var o = this,
                      a = g.default.peerConnectionFactory(e, s.PeerConnectionMode.P2P, t, i);
                  return a.setHoldKey(r), a._setRemoteDescription(n).then(function() {
                      if (u.CallManager.get().calls[e]) return o._peerConnections[e] = a, a;
                      a.close()
                  })
              }
          }, {
              key: "getPeerConnect",
              value: function(e) {
                  return this._peerConnections[e]
              }
          }, {
              key: "onSignalingConnected",
              value: function() {}
          }, {
              key: "onSignalingClosed",
              value: function() {
                  this.logger.info("Closing all peer connections because signaling connection has closed"), this.waitingPeerConnections = {};
                  for (var e in this._peerConnections) this._peerConnections[e].close();
                  this._peerConnections = {}
              }
          }, {
              key: "onSignalingConnectionFailed",
              value: function(e) {}
          }, {
              key: "onMediaConnectionFailed",
              value: function() {}
          }, {
              key: "closeAll",
              value: function() {
                  for (var e in this._peerConnections) this._peerConnections[e].close();
                  this._peerConnections = {}
              }
          }, {
              key: "setBandwidthParams",
              value: function(e) {
                  this._bandwidthParams = e
              }
          }, {
              key: "addBandwidthParams",
              value: function(e) {
                  return this._bandwidthParams && (e.sdp = e.sdp.replace(/(a=mid:video.*\r\n)/g, "$1b=AS:" + this._bandwidthParams + "\r\n")), e
              }
          }, {
              key: "rpcHandlerCreatePC",
              value: function(t, n) {
                  this.logger.info("rpcHandlerCreatePC(), received SDP: \n" + n.replace("<br>", "\n\r")), n = m.SDPMuggle.addSetupAttribute(n);
                  var r = e.sdpOffersVideo(n),
                      i = s.PeerConnectionMode.CLIENT_SERVER_V1;
                  c.VoxSignaling.get().callRemoteFunction(f.RemoteFunction.muteLocal, t, !1);
                  var o = g.default.peerConnectionFactory(t, i, r);
                  this._peerConnections[t] = o;
                  var a = u.CallManager.get().calls[t];
                  h.default.StreamManager.get().getCallStream(a).then(function(e) {
                      "__default" === t && (n = n.replace("a=sendrecv", "a=recvonly")), o.fastAddCustomMedia(e), o.processRemoteOffer(n).then(function(e) {
                          void 0 === a || a.checkCallMode(d.CallMode.SERVER) ? c.VoxSignaling.get().callRemoteFunction(f.RemoteFunction.confirmPC, t, e) : c.VoxSignaling.get().callRemoteFunction(f.RemoteFunction.acceptCall, [t, u.CallManager.cleanHeaders(a.headers()), e]), "__default" !== t && void 0 !== u.CallManager.get().calls[t] && (u.CallManager.get().calls[t].peerConnection = o)
                      })
                  }).catch(function(e) {
                      void 0 !== a ? u.CallManager.get().handleConnectionFailed(a.id(), 403, "Media access denied", {}) : c.VoxSignaling.get().onConnectionFailedRPC()
                  })
              }
          }, {
              key: "rpcHandlerDestroyPC",
              value: function(e) {
                  var t = this;
                  this._peerConnections[e] && ("__default" === e ? setTimeout(function() {
                      t._peerConnections[e].close(), delete t._peerConnections[e]
                  }, 200) : (this._peerConnections[e].close(), delete this._peerConnections[e])), delete this.waitingPeerConnections[e]
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "PCFactory"
              }
          }, {
              key: "peerConnections",
              get: function() {
                  return this._peerConnections
              }
          }, {
              key: "requireMedia",
              get: function() {
                  return this._requireMedia
              },
              set: function(e) {
                  this._requireMedia = e
              }
          }], [{
              key: "get",
              value: function() {
                  return null === this.inst && (this.inst = new e), this.inst
              }
          }, {
              key: "sdpOffersVideo",
              value: function(e) {
                  return {
                      receiveVideo: -1 !== e.indexOf("m=video"),
                      sendVideo: !0
                  }
              }
          }]), e
      }();
  y.inst = null, y.hasTransceivers = !1, a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "setupDirectPC", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "incomeDirectPC", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "getPeerConnect", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "onSignalingConnected", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "onSignalingClosed", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "onSignalingConnectionFailed", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "onMediaConnectionFailed", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "closeAll", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "setBandwidthParams", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "addBandwidthParams", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "rpcHandlerCreatePC", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y.prototype, "rpcHandlerDestroyPC", null), a([l.LogManager.d_trace(l.LogCategory.PCFACTORY)], y, "sdpOffersVideo", null), t.PCFactory = y
}, function(e, t, n) {
  "use strict";
  var r = !0,
      i = !0,
      o = {
          disableLog: function(e) {
              return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (r = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
          },
          disableWarnings: function(e) {
              return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (i = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
          },
          log: function() {
              if ("object" == typeof window) {
                  if (r) return;
                  "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
              }
          },
          deprecated: function(e, t) {
              i && console.warn(e + " is deprecated, please use " + t + " instead.")
          },
          extractVersion: function(e, t, n) {
              var r = e.match(t);
              return r && r.length >= n && parseInt(r[n], 10)
          },
          detectBrowser: function(e) {
              var t = e && e.navigator,
                  n = {};
              if (n.browser = null, n.version = null, void 0 === e || !e.navigator) return n.browser = "Not a browser.", n;
              if (t.mozGetUserMedia) n.browser = "firefox", n.version = this.extractVersion(t.userAgent, /Firefox\/(\d+)\./, 1);
              else if (t.webkitGetUserMedia)
                  if (e.webkitRTCPeerConnection) n.browser = "chrome", n.version = this.extractVersion(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
                  else {
                      if (!t.userAgent.match(/Version\/(\d+).(\d+)/)) return n.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support.", n;
                      n.browser = "safari", n.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
                  }
              else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) n.browser = "edge", n.version = this.extractVersion(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
              else {
                  if (!t.mediaDevices || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return n.browser = "Not a supported browser.", n;
                  n.browser = "safari", n.version = this.extractVersion(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
              }
              return n
          }
      };
  e.exports = {
      log: o.log,
      deprecated: o.deprecated,
      disableLog: o.disableLog,
      disableWarnings: o.disableWarnings,
      extractVersion: o.extractVersion,
      shimCreateObjectURL: o.shimCreateObjectURL,
      detectBrowser: o.detectBrowser.bind(o)
  }
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var i = function e() {
      r(this, e)
  };
  i.DIRECT_CALL_HEADER = "X-DirectCall", i.VIAMEDIA_CALL_HEADER = "X-ViaMedia", i.CALLSTATSIOID_HEADER = "X-CallstatsIOID", i.CALL_DATA_HEADER = "VI-CallData", i.ZINGAYA_IM_MIME_TYPE = "application/zingaya-im", i.P2P_SPD_FRAG_MIME_TYPE = "voximplant/sdpfrag", i.VI_HOLD_EMUL = "vi/holdemul", i.VI_SPD_OFFER_MIME_TYPE = "vi/sdpoffer", i.VI_SPD_ANSWER_MIME_TYPE = "vi/sdpanswer", i.VI_CONF_PARTICIPANT_INFO_ADDED = "vi/conf-info-added", i.VI_CONF_PARTICIPANT_INFO_REMOVED = "vi/conf-info-removed", i.VI_CONF_PARTICIPANT_INFO_UPDATED = "vi/conf-info-updated", t.Constants = i
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s, c = n(2),
      l = n(0),
      u = n(8),
      d = n(3),
      g = n(13),
      f = n(17),
      p = n(1),
      v = n(42);
  ! function(e) {
      e[e.IDLE = 0] = "IDLE", e[e.IN_PROGRESS = 1] = "IN_PROGRESS"
  }(s = t.AuthenticatorState || (t.AuthenticatorState = {}));
  var h = function() {
      function e() {
          var t = this;
          r(this, e), this.FAIL_CODE_SECOND_STAGE = 301, this.FAIL_CODE_ONE_TIME_KEY = 302, this._displayName = null, this._username = null, this._authorized = !1, this.signaling = c.VoxSignaling.get(), this.currentState = s.IDLE, this.logger = l.LogManager.get().createLogger(l.LogCategory.SIGNALING, this._traceName()), this.signaling.setRPCHandler(g.RemoteEvent.loginFailed, function(e, n) {
              t.onLoginFailed(e, n)
          }), this.signaling.setRPCHandler(g.RemoteEvent.loginSuccessful, function(e, n) {
              t.onLoginSuccesful(e, n)
          }), this.signaling.setRPCHandler(g.RemoteEvent.refreshOauthTokenFailed, function(e) {
              t.handler.onRefreshTokenFailed(e)
          }), this.signaling.setRPCHandler(g.RemoteEvent.refreshOauthTokenSuccessful, function(e) {
              t.handler.onRefreshTokenSuccess(e.OAuth)
          }), this.signaling.addHandler(this)
      }
      return i(e, [{
          key: "setHandler",
          value: function(e) {
              this.handler = e
          }
      }, {
          key: "onLoginFailed",
          value: function(e, t) {
              switch (this.currentState = s.IDLE, e) {
                  case this.FAIL_CODE_ONE_TIME_KEY:
                      this.handler.onOneTimeKeyGenerated(t);
                      break;
                  case this.FAIL_CODE_SECOND_STAGE:
                      this.handler.onSecondStageInitiated();
                      break;
                  default:
                      this.handler.onLoginFailed(e)
              }
          }
      }, {
          key: "onLoginSuccesful",
          value: function(e, t) {
              this.currentState = s.IDLE, this._authorized = !0, u.PCFactory.get().iceConfig = t.iceConfig, p.Client.getInstance() && p.Client.getInstance().config() && p.Client.getInstance().config().experiments && p.Client.getInstance().config().experiments.cleverACD && v.default.setConnectionId(t.connectionId), this._displayName = e, f.CallstatsIo.get().init({
                  userName: this._username,
                  aliasName: this._displayName
              }), this.handler.onLoginSuccessful(e, t.OAuth)
          }
      }, {
          key: "basicLogin",
          value: function(e, t, n) {
              if (this.currentState != s.IDLE) return void this.logger.error("Login operation already in progress");
              this._username = e, this.currentState = s.IN_PROGRESS, this.signaling.callRemoteFunction(d.RemoteFunction.login, e, t, n)
          }
      }, {
          key: "tokenLogin",
          value: function(e, t) {
              if (this.currentState != s.IDLE) return void this.logger.error("Login operation already in progress");
              this._username = e, this.currentState = s.IN_PROGRESS, this.signaling.callRemoteFunction(d.RemoteFunction.login, e, "", t)
          }
      }, {
          key: "tokenRefresh",
          value: function(e, t, n) {
              n ? this.signaling.callRemoteFunction(d.RemoteFunction.refreshOauthToken, e, {
                  refreshToken: t,
                  deviceToken: n
              }) : this.signaling.callRemoteFunction(d.RemoteFunction.refreshOauthToken, e, t)
          }
      }, {
          key: "loginUsingOneTimeKey",
          value: function(e, t, n) {
              if (this.currentState != s.IDLE) return void this.logger.error("Login operation already in progress");
              this._username = e, this.currentState = s.IN_PROGRESS, this.signaling.callRemoteFunction(d.RemoteFunction.loginUsingOneTimeKey, e, t, n)
          }
      }, {
          key: "loginStage2",
          value: function(e, t, n) {
              if (this.currentState != s.IDLE) return void this.logger.error("Login operation already in progress");
              this._username = e, this.currentState = s.IN_PROGRESS, this.signaling.callRemoteFunction(d.RemoteFunction.loginStage2, e, t, n)
          }
      }, {
          key: "generateOneTimeKey",
          value: function(e) {
              if (this.currentState != s.IDLE) return void this.logger.error("Login operation already in progress");
              this.currentState = s.IN_PROGRESS, this.signaling.callRemoteFunction(d.RemoteFunction.loginGenerateOneTimeKey, e)
          }
      }, {
          key: "username",
          value: function() {
              return this._username
          }
      }, {
          key: "authorized",
          value: function() {
              return this._authorized
          }
      }, {
          key: "onSignalingConnected",
          value: function() {}
      }, {
          key: "onSignalingConnectionFailed",
          value: function(e) {}
      }, {
          key: "onSignalingClosed",
          value: function() {
              this._authorized = !1, this._displayName = null, this._username = null
          }
      }, {
          key: "onMediaConnectionFailed",
          value: function() {}
      }, {
          key: "ziAuthorized",
          value: function(e) {
              this._authorized = e
          }
      }, {
          key: "_traceName",
          value: function() {
              return "Authenticator"
          }
      }, {
          key: "displayName",
          get: function() {
              return this._displayName
          }
      }], [{
          key: "get",
          value: function() {
              return void 0 === this.inst && (this.inst = new e), this.inst
          }
      }]), e
  }();
  a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "setHandler", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "onLoginFailed", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "onLoginSuccesful", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "basicLogin", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "tokenLogin", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "tokenRefresh", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "loginUsingOneTimeKey", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "loginStage2", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "generateOneTimeKey", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "username", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "authorized", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "onSignalingConnected", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "onSignalingConnectionFailed", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "onSignalingClosed", null), a([l.LogManager.d_trace(l.LogCategory.AUTHENTICATOR)], h.prototype, "onMediaConnectionFailed", null), t.Authenticator = h
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      },
      c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var u, d = n(5),
      g = n(2),
      f = n(10),
      p = n(0),
      v = n(8),
      h = n(6),
      m = n(7),
      y = n(3),
      C = n(1),
      S = n(15),
      _ = n(23),
      E = n(4);
  ! function(e) {
      e[e.ALERTING = "ALERTING"] = "ALERTING", e[e.PROGRESSING = "PROGRESSING"] = "PROGRESSING", e[e.CONNECTED = "CONNECTED"] = "CONNECTED", e[e.UPDATING = "UPDATING"] = "UPDATING", e[e.ENDED = "ENDED"] = "ENDED"
  }(u = t.CallState || (t.CallState = {}));
  var L;
  ! function(e) {
      e[e.P2P = 0] = "P2P", e[e.SERVER = 1] = "SERVER"
  }(L = t.CallMode || (t.CallMode = {}));
  var M = function(e) {
      function t(e, n, o, a) {
          r(this, t);
          var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          s.remoteMuteState = !0, s.signalingConnected = !1, s.settings = a, s.settings.id = e, s.settings.displayName = n, s.settings.mode = L.P2P, s.settings.active = !0, s.settings.usedSinkId = null, s.settings.incoming = o, s.settings.state = o ? u.ALERTING : u.PROGRESSING;
          C.Client.getInstance().config();
          return s.settings.audioDirections = {
              sendAudio: !0
          }, s.settings.videoDirections = "boolean" == typeof a.video ? {
              sendVideo: a.video,
              receiveVideo: !0
          } : a.video, s.settings.hasEarlyMedia = !1, s.logger = p.LogManager.get().createLogger(p.LogCategory.CALL, "Call " + e), s._callManager = h.CallManager.get(), s
      }
      return o(t, e), a(t, [{
          key: "id",
          value: function() {
              return this.settings ? this.settings.id : "new"
          }
      }, {
          key: "number",
          value: function() {
              return this.settings.number
          }
      }, {
          key: "displayName",
          value: function() {
              return this.settings.displayName
          }
      }, {
          key: "headers",
          value: function() {
              return this.settings.extraHeaders
          }
      }, {
          key: "active",
          value: function() {
              return this.settings.active
          }
      }, {
          key: "_setActive",
          value: function(e) {
              var t = {
                  call: this,
                  old: this.settings.active,
                  new: e,
                  name: d.CallEvents.ActiveUpdated
              };
              return this.settings.active = e, this.dispatchEvent(t), this.muteIncomingStreams(e), e
          }
      }, {
          key: "muteIncomingStreams",
          value: function(e) {
              this.getEndpoints().forEach(function(t) {
                  t.mediaRenderers.forEach(function(t) {
                      t.stream.getTracks().forEach(function(t) {
                          t.enabled = e
                      })
                  })
              })
          }
      }, {
          key: "state",
          value: function() {
              return u[this.settings.state]
          }
      }, {
          key: "_setState",
          value: function(e) {
              var t = {
                  call: this,
                  old: this.settings.state,
                  new: e,
                  name: d.CallEvents.StateUpdated
              };
              return this.settings.state = e, this.dispatchEvent(t), e
          }
      }, {
          key: "answer",
          value: function(e, t, n) {
              if (this.logger.info("answer(" + JSON.stringify(n) + ")"), void 0 !== e && (void 0 !== t && "object" === (void 0 === t ? "undefined" : c(t)) || (t = {}), t[f.Constants.CALL_DATA_HEADER] = e), void 0 !== n && (n = {
                      sendVideo: C.Client.getInstance().config().videoSupport,
                      receiveVideo: C.Client.getInstance().config().videoSupport
                  }), this.settings.state != u.ALERTING) throw new Error("WRONG_CALL_STATE");
              void 0 !== n && this._peerConnection.setVideoFlags(n)
          }
      }, {
          key: "decline",
          value: function(e) {
              if (this.logger.info("decline()"), this.settings.state != u.ALERTING) throw new Error("WRONG_CALL_STATE");
              g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.rejectCall, this.settings.id, !1, h.CallManager.cleanHeaders(e))
          }
      }, {
          key: "reject",
          value: function(e) {
              if (this.logger.info("reject()"), this.settings.state != u.ALERTING) throw new Error("WRONG_CALL_STATE");
              g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.rejectCall, this.settings.id, !0, h.CallManager.cleanHeaders(e))
          }
      }, {
          key: "hangup",
          value: function(e) {
              if (this.logger.info("hangup()"), this.settings.state == u.CONNECTED || this.settings.state == u.UPDATING || this.settings.state == u.PROGRESSING) g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.disconnectCall, this.settings.id, h.CallManager.cleanHeaders(e));
              else {
                  if (this.settings.state != u.ALERTING) throw new Error("WRONG_CALL_STATE");
                  g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.rejectCall, this.settings.id, !0, h.CallManager.cleanHeaders(e))
              }
          }
      }, {
          key: "sendTone",
          value: function(e) {
              this.logger.info("sendTone(" + e + ")"), this.settings.active && this._peerConnection.sendDTMF(e)
          }
      }, {
          key: "mutePlayback",
          value: function() {
              this.logger.info("mutePlayback()"), this.remoteMuteState = !1, _.EndpointManager.get().getEndpoints(this).forEach(function(e) {
                  e.mediaRenderers.forEach(function(e) {
                      e.setVolume(0)
                  })
              })
          }
      }, {
          key: "unmutePlayback",
          value: function() {
              this.logger.info("unmutePlayback()"), this.remoteMuteState = !0, _.EndpointManager.get().getEndpoints(this).forEach(function(e) {
                  e.mediaRenderers.forEach(function(e) {
                      e.setVolume(1)
                  })
              })
          }
      }, {
          key: "restoreRMute",
          value: function() {
              var e = this;
              this.settings.active && _.EndpointManager.get().getEndpoints(this).forEach(function(t) {
                  t.mediaRenderers.forEach(function(t) {
                      t.setVolume(e.remoteMuteState ? 1 : 0)
                  })
              })
          }
      }, {
          key: "muteMicrophone",
          value: function() {
              this.logger.info("muteMicrophone()"), this.peerConnection.muteMicrophone(!0)
          }
      }, {
          key: "unmuteMicrophone",
          value: function() {
              this.logger.info("unmuteMicrophone()"), this.peerConnection.muteMicrophone(!1)
          }
      }, {
          key: "showRemoteVideo",
          value: function() {
              var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              void 0 === e && (e = !0);
              var t = _.EndpointManager.get().getEndpoints(this);
              t && t.forEach(function(t) {
                  t.mediaRenderers && t.mediaRenderers.forEach(function(t) {
                      t.element && (t.element.style.display = e ? "block" : "none")
                  })
              })
          }
      }, {
          key: "setRemoteVideoPosition",
          value: function(e, t) {
              throw new Error("Deprecated: please use CSS to position '#voximplantcontainer' element")
          }
      }, {
          key: "setRemoteVideoSize",
          value: function(e, t) {
              throw new Error("Deprecated: please use CSS to set size of '#voximplantcontainer' element")
          }
      }, {
          key: "sendInfo",
          value: function(e, t, n) {
              this.logger.info("sendInfo(" + e + ", " + JSON.stringify(t) + ")");
              var r, i, o = e.indexOf("/"); - 1 == o ? (r = "application", i = e) : (r = e.substring(0, o), i = e.substring(o + 1)), g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.sendSIPInfo, this.settings.id, r, i, t, h.CallManager.cleanHeaders(n))
          }
      }, {
          key: "sendMessage",
          value: function(e) {
              this.logger.info("sendMessage()"), this.sendInfo(f.Constants.ZINGAYA_IM_MIME_TYPE, e, {})
          }
      }, {
          key: "setVideoSettings",
          value: function(e, t, n) {
              this.logger.info("Setting call " + this.id() + " video settings: " + JSON.stringify(e)), E.default.CameraManager.get().setCallVideoSettings(this, E.default.CameraManager.legacyParamConverter(e)), E.default.StreamManager.get().updateCallStream(this).then(function(e) {
                  t && t(e)
              }, function(e) {
                  n && n()
              })
          }
      }, {
          key: "getVideoElementId",
          value: function() {
              var e = _.EndpointManager.get().getEndpoints(this);
              return void 0 !== e && e.forEach(function(e) {
                  e.mediaRenderers.forEach(function(e) {
                      if (e.stream) {
                          if (e.stream.getVideoTracks().length) return e.stream.getTracks()[0].id
                      }
                  })
              }), ""
          }
      }, {
          key: "addEventListener",
          value: function(e, n) {
              s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addEventListener", this).call(this, e, n)
          }
      }, {
          key: "on",
          value: function(e, n, r) {
              s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "on", this).call(this, e, n)
          }
      }, {
          key: "removeEventListener",
          value: function(e, n) {
              s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "removeEventListener", this).call(this, e, n)
          }
      }, {
          key: "off",
          value: function(e, n) {
              s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "off", this).call(this, e, n)
          }
      }, {
          key: "dispatchEvent",
          value: function(e) {
              e.name !== d.CallEvents.Updated && e.name !== d.CallEvents.UpdateFailed || this._setState(u.CONNECTED), s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "dispatchEvent", this).call(this, e)
          }
      }, {
          key: "onConnected",
          value: function(e, t) {
              if (this.signalingConnected) return !!this.checkState([u.PROGRESSING, u.ALERTING], "onConnected") && (this._setState(u.CONNECTED), this.startTime = Date.now(), this.dispatchEvent({
                  name: "Connected",
                  call: this,
                  headers: e
              }), !0)
          }
      }, {
          key: "onDisconnected",
          value: function(e, t) {
              var n = this;
              return new Promise(function(r, i) {
                  if (n.stopSharingScreen(), !n.checkState([u.CONNECTED, u.ALERTING, u.PROGRESSING, u.UPDATING], "onDisconnected")) return i(new Error("Call in the wrong state " + n.state())), !1;
                  n._setState(u.ENDED), _.EndpointManager.get().clear(n).then(function() {
                      r(!0), n.dispatchEvent({
                          name: "Disconnected",
                          call: n,
                          headers: e,
                          params: t
                      })
                  }).catch(function(e) {
                      i(new Error("Endpoint manager got some error: " + e.message))
                  })
              })
          }
      }, {
          key: "onFailed",
          value: function(e, t, n) {
              return this.dispatchEvent({
                  name: "Failed",
                  call: this,
                  headers: n,
                  code: e,
                  reason: t
              }), this._setState(u.ENDED), _.EndpointManager.get().clear(this), !0
          }
      }, {
          key: "onStopRinging",
          value: function() {
              return !!this.checkState([u.PROGRESSING, u.CONNECTED], "onStopRinging") && (this.dispatchEvent({
                  name: "ProgressToneStop",
                  call: this
              }), !0)
          }
      }, {
          key: "onRingOut",
          value: function() {
              return !!this.checkState(u.PROGRESSING, "onRingOut") && (this.dispatchEvent({
                  name: "ProgressToneStart",
                  call: this
              }), !0)
          }
      }, {
          key: "onTransferComplete",
          value: function() {
              return !!this.checkState(u.CONNECTED, "onTransferComplete") && (this.dispatchEvent({
                  name: "TransferComplete",
                  call: this
              }), !0)
          }
      }, {
          key: "onTransferFailed",
          value: function() {
              return !!this.checkState(u.CONNECTED, "onTransferFailed") && (this.dispatchEvent({
                  name: "TransferFailed",
                  call: this
              }), !0)
          }
      }, {
          key: "onInfo",
          value: function(e, t, n, r, i) {
              if (e.stateValue == u.CONNECTED || e.stateValue == u.PROGRESSING || e.stateValue == u.ALERTING || e.stateValue == u.UPDATING) {
                  var o = t + "/" + n;
                  if (o == f.Constants.ZINGAYA_IM_MIME_TYPE) this.dispatchEvent({
                      name: "onSendMessage",
                      call: this,
                      text: r
                  });
                  else if (o == f.Constants.P2P_SPD_FRAG_MIME_TYPE) {
                      var a = JSON.parse(r);
                      for (var s in a) void 0 !== e && void 0 !== e.peerConnection ? e.peerConnection.addRemoteCandidate(a[s][1], a[s][0]) : this.logger.info("Candidate skipped. Connection not created yet.")
                  } else if (o === f.Constants.VI_CONF_PARTICIPANT_INFO_ADDED || o === f.Constants.VI_CONF_PARTICIPANT_INFO_REMOVED || o === f.Constants.VI_CONF_PARTICIPANT_INFO_UPDATED) {
                      var c = JSON.parse(r);
                      c ? _.EndpointManager.get().endpointInfoUpdated(this, o, c) : this.logger.warning("Wrong endpoint info")
                  } else this.dispatchEvent({
                      name: "InfoReceived",
                      call: this,
                      body: r,
                      headers: i,
                      mimeType: o
                  });
                  return !0
              }
              this.logger.warning("received handleSIPInfo for call: " + e.id() + " in invalid state: " + e.state())
          }
      }, {
          key: "setActive",
          value: function(e) {
              var t = this;
              return this.logger.info("setActive(" + e + ")"), new Promise(function(n, r) {
                  return e === t.settings.active ? void n({
                      name: d.CallEvents.Updated,
                      result: !1,
                      call: t
                  }) : "firefox" === m.default.getWSVendor() ? (t.sendInfo(f.Constants.VI_HOLD_EMUL, JSON.stringify({
                      hold: !e
                  })), void n({
                      name: d.CallEvents.Updated,
                      call: t,
                      result: !0
                  })) : void(t.settings.state == u.CONNECTED ? (t._setState(u.UPDATING), t._setActive(e), e ? g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.unhold, t.settings.id) : g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.hold, t.settings.id), n({
                      name: d.CallEvents.Updated,
                      result: !0,
                      call: t
                  })) : r({
                      name: d.CallEvents.UpdateFailed,
                      code: 11,
                      call: t
                  }))
              })
          }
      }, {
          key: "checkCallMode",
          value: function(e) {
              return this.settings.mode == e
          }
      }, {
          key: "canStartSendingCandidates",
          value: function() {
              void 0 === this._peerConnection && (this._peerConnection = v.PCFactory.get().peerConnections[this.settings.id]), this._peerConnection.canStartSendingCandidates()
          }
      }, {
          key: "notifyICETimeout",
          value: function() {
              this.dispatchEvent({
                  name: "ICETimeout",
                  call: this
              })
          }
      }, {
          key: "sendVideo",
          value: function(e) {
              var t = this;
              if (this.logger.info("sendVideo(" + e + ")"), !this.peerConnection) return new Promise(function(e, n) {
                  e({
                      call: t,
                      name: d.CallEvents[d.CallEvents.Updated],
                      result: !0
                  })
              });
              var n = this.settings.videoDirections.sendVideo;
              return this.settings.videoDirections.sendVideo = e, this.peerConnection.hasLocalVideo() ? e || n ? (this.peerConnection.enableVideo(e), new Promise(function(e, n) {
                  e({
                      call: t,
                      name: d.CallEvents[d.CallEvents.Updated],
                      result: !0
                  })
              })) : new Promise(function(e, n) {
                  E.default.StreamManager.get().updateCallStream(t).then(function() {
                      return e({
                          call: t,
                          name: d.CallEvents[d.CallEvents.Updated],
                          result: !0
                      })
                  }).catch(n)
              }) : e ? new Promise(function(e, n) {
                  E.default.StreamManager.get().updateCallStream(t).then(function() {
                      return e({
                          call: t,
                          name: d.CallEvents[d.CallEvents.Updated],
                          result: !0
                      })
                  }).catch(n)
              }) : void 0
          }
      }, {
          key: "receiveVideo",
          value: function() {
              var e = this;
              return this._setState(u.UPDATING), new Promise(function(t, n) {
                  if (!0 === e.settings.videoDirections.receiveVideo) return void n();
                  e.settings.videoDirections.receiveVideo = !0, e._peerConnection.hdnFRS().then(t, n)
              })
          }
      }, {
          key: "sendMedia",
          value: function(e, t) {
              var n = this;
              return this._setState(u.UPDATING), void 0 !== e && null !== e || (e = this.settings.audioDirections.sendAudio), void 0 !== t && null !== t || (t = this.settings.videoDirections.sendVideo), this.peerConnection.sendMedia(e, t).then(function(r) {
                  return void 0 !== t && null !== t && (n.settings.videoDirections.sendVideo = t), void 0 !== e && null !== e && (n.settings.audioDirections.sendAudio = e), r
              })
          }
      }, {
          key: "sendAudio",
          value: function(e) {
              var t = this;
              C.Client.getInstance().config();
              return this.settings.audioDirections.sendAudio = e, this.peerConnection.hasLocalAudio() ? (this.peerConnection.muteMicrophone(!e), new Promise(function(e, n) {
                  e({
                      call: t,
                      name: d.CallEvents[d.CallEvents.Updated],
                      result: !0
                  })
              })) : e ? this.sendMedia(null, e) : void 0
          }
      }, {
          key: "getLocalStream",
          value: function() {
              return E.default.StreamManager.get().getCallStream(this)
          }
      }, {
          key: "setLocalStream",
          value: function(e) {
              return new Promise(function(e, t) {
                  t(new Error("Not implemented"))
              })
          }
      }, {
          key: "shareScreen",
          value: function() {
              var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return this.logger.info("shareScreen(" + t + ")"), new Promise(function(n, r) {
                  E.default.StreamManager.get()._getScreenSharing(e).length && (e.logger.warning("Screen sharing already active."), r(new Error("Screen sharing already active."))), m.default.isScreenSharingSupported ? E.default.StreamManager.get()._newScreenSharing(e, t).then(function(t) {
                      t.renderer && e.dispatchEvent({
                          name: d.CallEvents.LocalVideoStreamAdded,
                          type: t.renderer.kind,
                          element: t.renderer.element,
                          videoStream: t.renderer.stream
                      }), e.peerConnection.addCustomMedia(t.stream).then(function() {
                          n({
                              name: d.CallEvents.Updated,
                              result: !0,
                              call: e
                          })
                      })
                  }).catch(function(t) {
                      e.logger.warning(t.message), r(t)
                  }) : (e.logger.warning("Sorry, this browser does not support screen sharing."), r(new Error("Sorry, this browser does not support screen sharing.")))
              })
          }
      }, {
          key: "stopSharingScreen",
          value: function() {
              var e = this;
              return this.logger.info("stopSharingScreen()"), new Promise(function(t, n) {
                  var r = E.default.StreamManager.get()._getScreenSharing(e);
                  if (r) {
                      var i = r.length;
                      0 === i && t({
                          name: d.CallEvents.Updated,
                          result: !0,
                          call: e
                      }), r.forEach(function(r) {
                          var o = !r.renderer;
                          E.default.StreamManager.get()._clearScreenSharing(e, r).then(function() {
                              if (o) return e.peerConnection.removeCustomMedia(r.stream)
                          }).then(function() {
                              if (r.stream = void 0, --i <= 0) return void t({
                                  name: d.CallEvents.Updated,
                                  result: !0,
                                  call: e
                              })
                          }).catch(function(t) {
                              e.logger.warning(t.message), n(t)
                          })
                      })
                  } else e.logger.warning("Sorry, screen sharing not started yet."), n(new Error("Sorry, screen sharing not started yet."))
              })
          }
      }, {
          key: "wireRemoteStream",
          value: function() {
              return new Promise(function(e, t) {
                  e()
              })
          }
      }, {
          key: "getRemoteAudioStreams",
          value: function() {
              var e = this;
              return new Promise(function(t, n) {
                  e.peerConnection ? (e.peerConnection.remoteStreams.forEach(function(e) {
                      if (e.getAudioTracks().length) return void t(new MediaStream(e.getAudioTracks()))
                  }), n(new Error("We have no remote MediaStream for this call yet"))) : n(new Error("We have no PC for this call yet"))
              })
          }
      }, {
          key: "getRemoteVideoStreams",
          value: function() {
              var e = this;
              return new Promise(function(t, n) {
                  e.peerConnection ? void 0 !== e.peerConnection.remoteStreams[0] && 0 != e.peerConnection.remoteStreams[0].getVideoTracks().length ? t(new MediaStream(e.peerConnection.remoteStreams[0].getVideoTracks())) : n(new Error("We have no remote MediaStream for this call yet")) : n(new Error("We have no PC for this call yet"))
              })
          }
      }, {
          key: "getRemoteWiredState",
          value: function() {
              return this.settings.wiredRemote
          }
      }, {
          key: "getLocalWiredState",
          value: function() {
              return this.settings.wiredLocal
          }
      }, {
          key: "useAudioOutput",
          value: function(e) {
              _.EndpointManager.get().useAudioOutput(this, e)
          }
      }, {
          key: "getAudioElementId",
          value: function() {
              return (this._peerConnection.remoteStreams.length = 0) ? null : (this._peerConnection.remoteStreams[0].getAudioTracks().length = 0) ? null : this._peerConnection.remoteStreams[0].getAudioTracks()[0].id
          }
      }, {
          key: "getDirections",
          value: function() {
              if (void 0 !== this.peerConnection) return this.peerConnection.getDirections()
          }
      }, {
          key: "getStreamActivity",
          value: function() {
              return {}
          }
      }, {
          key: "hdnFRS",
          value: function() {
              this.peerConnection._hdnFRS()
          }
      }, {
          key: "hdnFRSPrep",
          value: function() {
              var e = this;
              void 0 !== this.peerConnection ? this.peerConnection._hdnFRSPrep() : setTimeout(function() {
                  e.hdnFRSPrep()
              }, 1e3)
          }
      }, {
          key: "runIncomingReInvite",
          value: function(e, t) {
              var n = this;
              if (this.settings.state === u.UPDATING) g.VoxSignaling.get().callRemoteFunction(y.RemoteFunction.rejectReInvite, this.settings.id, {});
              else {
                  this._setState(u.UPDATING);
                  var r = h.CallManager.get().isSDPHasVideo(t);
                  this.peerConnection.handleReinvite(e, t, r).then(function() {
                      n.peerConnection.restoreMute(), n.peerConnection.restoreVideoSending()
                  })
              }
          }
      }, {
          key: "setActiveForce",
          value: function(e) {
              this._setActive(e)
          }
      }, {
          key: "getCallDuration",
          value: function() {
              return Date.now() - this.startTime
          }
      }, {
          key: "getEndpoints",
          value: function() {
              return _.EndpointManager.get().getEndpoints(this)
          }
      }, {
          key: "checkState",
          value: function(e, t) {
              if (e)
                  if ("string" != typeof e) {
                      for (var n = !1, r = e, i = 0; i < r.length; i++) r[i] == this.settings.state && (n = !0);
                      if (!n) return this.logger.warning("Received " + t + " in invalid state " + this.settings.state), !1
                  } else if (this.settings.state != e) return this.logger.warning("Received " + t + " in invalid state " + this.settings.state), !1;
              return !0
          }
      }, {
          key: "_traceName",
          value: function() {
              return "Call"
          }
      }, {
          key: "promise",
          get: function() {
              return this._promise
          }
      }, {
          key: "peerConnection",
          get: function() {
              return this._peerConnection
          },
          set: function(e) {
              this._peerConnection = e
          }
      }, {
          key: "stateValue",
          get: function() {
              return this.settings.state
          }
      }]), t
  }(S.EventTarget);
  l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "number", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "displayName", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "headers", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "active", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "_setActive", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "_setState", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "answer", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "decline", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "reject", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "hangup", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "sendTone", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "mutePlayback", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "unmutePlayback", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "restoreRMute", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "muteMicrophone", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "unmuteMicrophone", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "showRemoteVideo", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "setRemoteVideoPosition", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "setRemoteVideoSize", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "sendInfo", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "sendMessage", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "setVideoSettings", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "getVideoElementId", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "addEventListener", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "on", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "removeEventListener", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "off", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "dispatchEvent", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onConnected", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onDisconnected", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onFailed", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onStopRinging", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onRingOut", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onTransferComplete", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onTransferFailed", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "onInfo", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "setActive", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "checkCallMode", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "canStartSendingCandidates", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "notifyICETimeout", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "sendVideo", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "receiveVideo", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "sendAudio", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "getLocalStream", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "setLocalStream", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "shareScreen", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "stopSharingScreen", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "wireRemoteStream", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "getRemoteAudioStreams", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "getRemoteVideoStreams", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "getRemoteWiredState", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "getLocalWiredState", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "useAudioOutput", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "getAudioElementId", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "getStreamActivity", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "hdnFRS", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "hdnFRSPrep", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "runIncomingReInvite", null), l([p.LogManager.d_trace(p.LogCategory.CLIENT)], M.prototype, "setActiveForce", null), l([p.LogManager.d_trace(p.LogCategory.CALL)], M.prototype, "checkState", null), t.Call = M
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.loginFailed = "loginFailed"] = "loginFailed", e[e.loginSuccessful = "loginSuccessful"] = "loginSuccessful", e[e.handleError = "handleError"] = "handleError", e[e.onPCStats = "__onPCStats"] = "onPCStats", e[e.handleIncomingConnection = "handleIncomingConnection"] = "handleIncomingConnection", e[e.handleConnectionConnected = "handleConnectionConnected"] = "handleConnectionConnected", e[e.handleConnectionDisconnected = "handleConnectionDisconnected"] = "handleConnectionDisconnected", e[e.handleRingOut = "handleRingOut"] = "handleRingOut", e[e.startEarlyMedia = "startEarlyMedia"] = "startEarlyMedia", e[e.stopRinging = "stopRinging"] = "stopRinging", e[e.handleConnectionFailed = "handleConnectionFailed"] = "handleConnectionFailed", e[e.handleSIPInfo = "handleSIPInfo"] = "handleSIPInfo", e[e.handleSipEvent = "handleSipEvent"] = "handleSipEvent", e[e.handleTransferStarted = "handleTransferStarted"] = "handleTransferStarted", e[e.handleTransferComplete = "handleTransferComplete"] = "handleTransferComplete", e[e.handleTransferFailed = "handleTransferFailed"] = "handleTransferFailed", e[e.handleReInvite = "handleReInvite"] = "handleReInvite", e[e.handleAcceptReinvite = "handleAcceptReinvite"] = "handleAcceptReinvite", e[e.handleRejectReinvite = "handleRejectReinvite"] = "handleRejectReinvite", e[e.createPC = "__createPC"] = "createPC", e[e.destroyPC = "__destroyPC"] = "destroyPC", e[e.connectionSuccessful = "__connectionSuccessful"] = "connectionSuccessful", e[e.connectionFailed = "__connectionFailed"] = "connectionFailed", e[e.createConnection = "__createConnection"] = "createConnection", e[e.pong = "__pong"] = "pong", e[e.increaseGain = "increaseGain"] = "increaseGain", e[e.handlePreFlightCheckResult = "handlePreFlightCheckResult"] = "handlePreFlightCheckResult", e[e.handleVoicemail = "handleVoicemail"] = "handleVoicemail", e[e.onCallRemoteFunctionError = "onCallRemoteFunctionError"] = "onCallRemoteFunctionError", e[e.refreshOauthTokenFailed = "refreshOauthTokenFailed"] = "refreshOauthTokenFailed", e[e.refreshOauthTokenSuccessful = "refreshOauthTokenSuccessful"] = "refreshOauthTokenSuccessful", e[e.sipRegisterSuccessful = "sipRegisterSuccessful"] = "sipRegisterSuccessful", e[e.sipRegisterFailed = "sipRegisterFailed"] = "sipRegisterFailed", e[e.onACDStatus = "onACDStatus"] = "onACDStatus", e[e.onICEConfig = "onICEConfig"] = "onICEConfig", e[e.onICEConfigFailed = "onICEConfigFailed"] = "onICEConfigFailed"
  }(t.RemoteEvent || (t.RemoteEvent = {}))
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.SDKReady = "SDKReady"] = "SDKReady", e[e.ConnectionEstablished = "ConnectionEstablished"] = "ConnectionEstablished", e[e.ConnectionFailed = "ConnectionFailed"] = "ConnectionFailed", e[e.ConnectionClosed = "ConnectionClosed"] = "ConnectionClosed", e[e.AuthResult = "AuthResult"] = "AuthResult", e[e.RefreshTokenResult = "RefreshTokenResult"] = "RefreshTokenResult", e[e.PlaybackFinished = "PlaybackFinished"] = "PlaybackFinished", e[e.MicAccessResult = "MicAccessResult"] = "MicAccessResult", e[e.IncomingCall = "IncomingCall"] = "IncomingCall", e[e.SourcesInfoUpdated = "SourcesInfoUpdated"] = "SourcesInfoUpdated", e[e.NetStatsReceived = "NetStatsReceived"] = "NetStatsReceived", e[e.SIPRegistrationSuccessful = "SIPRegistrationSuccessful"] = "SIPRegistrationSuccessful", e[e.SIPRegistrationFailed = "SIPRegistrationFailed"] = "SIPRegistrationFailed", e[e.ACDStatusUpdated = "ACDStatusUpdated"] = "ACDStatusUpdated", e[e.ACDError = "ACDError"] = "ACDError"
  }(t.Events || (t.Events = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "sysOn",
              value: function(e, t, n) {
                  this._ETonTo("system", e, t, n)
              }
          }, {
              key: "sysOff",
              value: function(e, t) {
                  this._EToffTo("system", e, t)
              }
          }, {
              key: "on",
              value: function(e, t, n) {
                  this._ETonTo("user", e, t, n)
              }
          }, {
              key: "off",
              value: function(e, t) {
                  this._EToffTo("user", e, t)
              }
          }, {
              key: "_ETonTo",
              value: function(e, t, n, r) {
                  void 0 === this.eventListeners && (this.eventListeners = {});
                  var i = this.eventListeners;
                  void 0 === i[t] && (i[t] = []);
                  var o = {
                      listener: n,
                      options: r,
                      _triggered: !1,
                      _namespace: e
                  };
                  r && r.capture ? i[t].unshift(o) : i[t].push(o)
              }
          }, {
              key: "_EToffTo",
              value: function(e, t, n) {
                  var r = this.eventListeners;
                  if (void 0 !== r && void 0 !== r[t])
                      if ("function" == typeof n) {
                          for (var i = 0; i < r[t].length; i++)
                              if (r[t][i].listener == n && r[t][i]._namespace === e) {
                                  r[t].splice(i, 1);
                                  break
                              }
                      } else r[t] = r[t].filter(function(t) {
                          return t._namespace !== e
                      })
              }
          }, {
              key: "dispatchEvent",
              value: function(e) {
                  if (void 0 !== this.eventListeners && void 0 !== this.eventListeners[e.name]) {
                      var t = this.eventListeners[e.name].filter(function(e) {
                          return "user" === e._namespace
                      });
                      s.LogManager.get().writeMessage(s.LogCategory.UTILS, "[event]", s.LogLevel.INFO, e.name + (e.name.includes("QualityIssue") ? " " + e.level : "") + ", listeners: " + t.length);
                      for (var n = 0; n < this.eventListeners[e.name].length; n++) try {
                          if (!(this.eventListeners[e.name][n].options && this.eventListeners[e.name][n].options.once && this.eventListeners[e.name][n]._triggered || "system" !== this.eventListeners[e.name][n]._namespace && "user" !== this.eventListeners[e.name][n]._namespace && ("default" !== this.eventListeners[e.name][n]._namespace || t.length))) {
                              this.eventListeners[e.name][n]._triggered = !0;
                              if (!1 === this.eventListeners[e.name][n].listener(e)) return
                          }
                      } catch (e) {
                          console.error(e)
                      }
                  } else s.LogManager.get().writeMessage(s.LogCategory.UTILS, "[event]", s.LogLevel.INFO, e.name + (e.name.includes("QualityIssue") ? " " + e.level : "") + ", listeners: 0")
              }
          }, {
              key: "removeEventListener",
              value: function(e, t) {
                  this.off(e, t)
              }
          }, {
              key: "addEventListener",
              value: function(e, t, n) {
                  this.on(e, t, n)
              }
          }, {
              key: "addDefaultEventListener",
              value: function(e, t) {
                  this._ETonTo("default", e, t, {})
              }
          }, {
              key: "removeDefaultEventListener",
              value: function(e) {
                  this._EToffTo("default", e)
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "EventTarget"
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "sysOn", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "sysOff", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "on", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "off", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "removeEventListener", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "addEventListener", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "addDefaultEventListener", null), a([s.LogManager.d_trace(s.LogCategory.EVENTTARGET)], c.prototype, "removeDefaultEventListener", null), t.EventTarget = c
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(1),
      a = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "SDPMuggle"
              }
          }], [{
              key: "detectDirections",
              value: function(t) {
                  var n = [],
                      r = t.split(/(\r\n|\r|\n)/).filter(e.validLine),
                      i = "";
                  return r.forEach(function(e) {
                      if (0 === e.indexOf("m=")) {
                          var t = e.substr(2);
                          i = t.split(" ")[0]
                      }
                      "" === i || "a=sendrecv" !== e && "a=sendonly" !== e && "a=recvonly" !== e && "a=inactive" !== e || (n.push({
                          type: i,
                          direction: e.substr(2)
                      }), i = "")
                  }), n
              }
          }, {
              key: "removeTelephoneEvents",
              value: function(t) {
                  if (-1 !== t.sdp.indexOf("a=rtpmap:127 telephone-event/8000")) {
                      for (var n = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine), r = -1, i = 0; i < n.length; i++) {
                          if (-1 !== n[i].indexOf("m=audio")) {
                              var o = n[i];
                              "string" == typeof o && (n[i] = o.replace(" 127", ""))
                          } - 1 !== n[i].indexOf("a=rtpmap:127 telephone-event/8000") && (r = i)
                      }
                      return n.splice(r, 1), new RTCSessionDescription({
                          sdp: n.join("\r\n") + "\r\n",
                          type: t.type
                      })
                  }
                  return t
              }
          }, {
              key: "removeDoubleOpus",
              value: function(t) {
                  if (-1 !== t.sdp.indexOf("a=rtpmap:109 opus") && -1 !== t.sdp.indexOf("a=rtpmap:111 opus")) {
                      for (var n = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine), r = -1, i = 0; i < n.length; i++) {
                          if (-1 !== n[i].indexOf("m=audio")) {
                              var o = n[i];
                              "string" == typeof o && (n[i] = o.replace(" 109", ""))
                          } - 1 !== n[i].indexOf("a=rtpmap:109 opus") && (r = i)
                      }
                      return n.splice(r, 1), new RTCSessionDescription({
                          sdp: n.join("\r\n") + "\r\n",
                          type: t.type
                      })
                  }
                  return t
              }
          }, {
              key: "removeDoublePT",
              value: function(t) {
                  for (var n = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine), r = [], i = 0; i < n.length; i++) {
                      var o = n[i];
                      0 === o.indexOf("m=video") && (r = o.split(" "), n[i] = r.filter(function(e, t) {
                          if (0 === t) return !0;
                          for (var n = t - 1; n >= 2; n--)
                              if (r[n] === e) return !1;
                          return !0
                      }).join(" "))
                  }
                  return new RTCSessionDescription({
                      sdp: n.join("\r\n") + "\r\n",
                      type: t.type
                  })
              }
          }, {
              key: "removeTransportCC",
              value: function(t) {
                  if (-1 !== t.sdp.indexOf("http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01")) {
                      var n = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine),
                          r = [];
                      return n.forEach(function(e, t) {
                          -1 !== e.indexOf("http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01") && r.unshift(t)
                      }), r.forEach(function(e) {
                          return n.splice(e, 1)
                      }), new RTCSessionDescription({
                          sdp: n.join("\r\n") + "\r\n",
                          type: t.type
                      })
                  }
                  return t
              }
          }, {
              key: "removeTIAS",
              value: function(t) {
                  if (-1 !== t.sdp.indexOf("b=TIAS:13888000") || -1 !== t.sdp.indexOf("b=AS:13888")) {
                      var n = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine),
                          r = [];
                      n.forEach(function(e, t) {
                          -1 === e.indexOf("b=TIAS:13888000") && -1 === e.indexOf("b=AS:13888") || r.unshift(t)
                      }), r.forEach(function(e) {
                          return n.splice(e, 1)
                      }), t = {
                          type: t.type,
                          sdp: n.join("\r\n") + "\r\n"
                      }
                  }
                  return t
              }
          }, {
              key: "fixVideoRecieve",
              value: function(t, n) {
                  if (-1 !== t.sdp.indexOf("m=video") && !n) {
                      var r = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine),
                          i = null;
                      return r = r.map(function(e, t) {
                          return null === i ? -1 !== e.indexOf("m=video") && (i = t) : "a=sendrecv" === e ? e = "a=sendonly" : "a=recvonly" === e && (e = "a=inactive"), e
                      }), new RTCSessionDescription({
                          sdp: r.join("\r\n") + "\r\n",
                          type: t.type
                      })
                  }
                  return t
              }
          }, {
              key: "addSetupAttribute",
              value: function(e) {
                  return -1 == e.indexOf("a=setup:") && (e += "a=setup:actpass\r\n"), e
              }
          }, {
              key: "findTrackByMid",
              value: function(t, n) {
                  for (var r = t.split(/(\r\n|\r|\n)/).filter(e.validLine), i = -1, o = 0; o < r.length && (-1 === r[o].indexOf("a=mid:") || -1 === i); o++)
                      if (-1 !== r[o].indexOf("a=mid:" + n) && (i = o), -1 !== r[o].indexOf("msid:") && -1 !== i) return r[o].split(" ").slice(-1).pop();
                  return ""
              }
          }, {
              key: "addXAS",
              value: function(e) {
                  if (o.Client.getInstance().config().experiments.xas && o.Client.getInstance().config().experiments.xas) {
                      var t = e.sdp,
                          n = o.Client.getInstance().config().experiments.xas;
                      return void 0 !== n.as && -1 !== n.as && (t = t.replace(/(a=mid:video.*\r\n)/g, "$1b=AS:" + n.as + "\r\n")), void 0 !== n.tias && -1 !== n.tias && (t = t.replace(/(a=mid:video.*\r\n)/g, "$1b=TIAS:" + n.as + "\r\n")), new RTCSessionDescription({
                          sdp: t,
                          type: e.type
                      })
                  }
                  return e
              }
          }, {
              key: "fixFFMIDBug",
              value: function(e) {
                  if (-1 == e.sdp.indexOf("a=mid")) {
                      var t = e.sdp.replace(/(m=audio.*\r\n)/g, "$1a=mid:0\r\n");
                      return new RTCSessionDescription({
                          sdp: t,
                          type: e.type
                      })
                  }
                  return e
              }
          }, {
              key: "fixFMTP",
              value: function(t) {
                  var n = t.sdp.split(/(\r\n|\r|\n)/).filter(e.validLine),
                      r = [];
                  return n = n.filter(function(e) {
                      if (0 == e.indexOf("a=fmtp")) {
                          var n = e.split(" ")[1],
                              i = n.replace("apt=", "");
                          return -1 !== t.sdp.indexOf("a=rtpmap:" + i) || (r.push(n[0].replace("a=fmtp:", "")), !1)
                      }
                      return !0
                  }).filter(function(e) {
                      return -1 === e.indexOf("a=rtpmap:") || -1 === r.indexOf(e.split(" ")[0].replace("a=rtpmap:", ""))
                  }).map(function(e) {
                      if (-1 !== e.indexOf("m=")) {
                          return e.split(" ").filter(function(e) {
                              return -1 === r.indexOf(e)
                          }).join(" ")
                      }
                      return e
                  }), {
                      sdp: n.join("\r\n") + "\r\n",
                      type: t.type
                  }
              }
          }]), e
      }();
  a.validLine = RegExp.prototype.test.bind(/^([a-z])=(.*)/), t.SDPMuggle = a
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(0);
  ! function(e) {
      e[e.multiplex = "multiplex"] = "multiplex", e[e.audio = "audio"] = "audio", e[e.video = "video"] = "video", e[e.screen = "screen"] = "screen", e[e.data = "data"] = "data", e[e.unbundled = "unbundled"] = "unbundled"
  }(t.CallstatsIoFabricUsage || (t.CallstatsIoFabricUsage = {}));
  ! function(e) {
      e[e.fabricHold = "fabricHold"] = "fabricHold", e[e.fabricResume = "fabricResume"] = "fabricResume", e[e.audioMute = "audioMute"] = "audioMute", e[e.audioUnmute = "audioUnmute"] = "audioUnmute", e[e.videoPause = "videoPause"] = "videoPause", e[e.videoResume = "videoResume"] = "videoResume", e[e.fabricTerminated = "fabricTerminated"] = "fabricTerminated", e[e.screenShareStart = "screenShareStart"] = "screenShareStart", e[e.screenShareStop = "screenShareStop"] = "screenShareStop", e[e.dominantSpeaker = "dominantSpeaker"] = "dominantSpeaker", e[e.activeDeviceList = "activeDeviceList"] = "activeDeviceList"
  }(t.CallstatsIoFabricEvent || (t.CallstatsIoFabricEvent = {}));
  ! function(e) {
      e[e.getUserMedia = "getUserMedia"] = "getUserMedia", e[e.createOffer = "createOffer"] = "createOffer", e[e.createAnswer = "createAnswer"] = "createAnswer", e[e.setLocalDescription = "setLocalDescription"] = "setLocalDescription", e[e.setRemoteDescription = "setRemoteDescription"] = "setRemoteDescription", e[e.addIceCandidate = "addIceCandidate"] = "addIceCandidate", e[e.iceConnectionFailure = "iceConnectionFailure"] = "iceConnectionFailure", e[e.signalingError = "signalingError"] = "signalingError", e[e.applicationLog = "applicationLog"] = "applicationLog"
  }(t.CallstatsioWrtcFuncNames || (t.CallstatsioWrtcFuncNames = {}));
  var a = function() {
      function e(t) {
          r(this, e), this._params = t, this.inited = !1, this.pendingFabric = [];
          var n = window;
          void 0 !== n.callstats && (this.callstats = new n.callstats(null, n.io))
      }
      return i(e, [{
          key: "init",
          value: function(t) {
              var n = this;
              return !!e.moduleEnabled && (o.LogManager.get().writeMessage(o.LogCategory.UTILS, "[CallstatsIo]", o.LogLevel.INFO, " Callstats.io SDK initialization start"), this.callstats.initialize(this._params.AppID, this._params.AppSecret, t, function() {
                  o.LogManager.get().writeMessage(o.LogCategory.UTILS, "[CallstatsIo]", o.LogLevel.INFO, " Callstats.io SDK initialization successful"), n.inited = !0, n.pendingFabric.map(function(e) {
                      n.callstats.addNewFabric(e.pc, e.remoteUser, e.fabricUsage, e.callID)
                  })
              }, function() {}, this.packParams()), !0)
          }
      }, {
          key: "packParams",
          value: function() {
              var e = {};
              return this._params.disableBeforeUnloadHandler && (e.disableBeforeUnloadHandler = this._params.disableBeforeUnloadHandler), this._params.applicationVersion && (e.applicationVersion = this._params.applicationVersion), e
          }
      }, {
          key: "addNewFabric",
          value: function(t, n, r, i) {
              if (!e.moduleEnabled) return !1;
              this.inited ? (o.LogManager.get().writeMessage(o.LogCategory.UTILS, "[CallstatsIo]", o.LogLevel.INFO, " Callstats.io addNewFabric"), this.callstats.addNewFabric(t, n, r, i)) : this.pendingFabric.push({
                  pc: t,
                  remoteUser: n,
                  fabricUsage: r,
                  callID: i
              })
          }
      }, {
          key: "sendFabricEvent",
          value: function(t, n, r) {
              if (!e.moduleEnabled) return !1;
              this.callstats.sendFabricEvent(t, n, r)
          }
      }, {
          key: "reportError",
          value: function(t, n, r, i, o, a) {
              if (!e.moduleEnabled) return !1;
              this.callstats.reportError(t, n, r, i, o, a)
          }
      }, {
          key: "_traceName",
          value: function() {
              return "CallstatsIo"
          }
      }], [{
          key: "isModuleEnabled",
          value: function() {
              return e.moduleEnabled
          }
      }, {
          key: "get",
          value: function(t) {
              return void 0 !== window.callstats && (e.moduleEnabled = !0), void 0 === e.instance && (e.instance = new e(t)), void 0 !== t && (e.instance._params = t), e.instance
          }
      }]), e
  }();
  a.moduleEnabled = !1, t.CallstatsIo = a
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      },
      c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var u = n(0),
      d = n(24),
      g = n(2),
      f = n(15),
      p = n(41),
      v = n(33),
      h = function(e) {
          function t() {
              r(this, t);
              var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              if (t.instance) throw new Error("Error - use Client.getMessagingInstance()");
              return e.query = [], setInterval(function() {
                  e.updateQuery()
              }, 220), e
          }
          return o(t, e), a(t, [{
              key: "capitalize",
              value: function(e) {
                  return e.toString()[0].toUpperCase() + e.toString().slice(1)
              }
          }, {
              key: "updateQuery",
              value: function() {
                  if (this.query.length) {
                      var e = this.query.splice(0, 1);
                      g.VoxSignaling.get().sendRaw(e[0])
                  }
              }
          }, {
              key: "addEventListener",
              value: function(e, n, r) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "addEventListener", this).call(this, e, n, r)
              }
          }, {
              key: "dispatchMsgEvent",
              value: function(e, t) {
                  if (void 0 !== this.eventListeners[e])
                      for (var n = 0; n < this.eventListeners[e].length; n++) this.eventListeners[e][n] && "function" == typeof this.eventListeners[e][n].listener && this.eventListeners[e][n].listener(t.payload, t.request_uuid)
              }
          }, {
              key: "handleWsData",
              value: function(e) {
                  if (-1 == Object.values(d.MsgEvent).indexOf(e.event)) throw new Error("Unknown messaging event " + e.event + " with payload " + JSON.stringify(e.payload));
                  this.dispatchMsgEvent(e.event, e)
              }
          }, {
              key: "sendWsMessage",
              value: function(e, t) {
                  var n = ["subscribe", "unsubscribe", "typingMessage", "isRead", "setStatus"].includes(e) ? "CommonNamespace" : "IncomingNamespace",
                      r = {
                          setStatus: "PresenceMessage",
                          isRead: "StatusMessage",
                          typingMessage: "TypingMessage",
                          subscribe: "ManageSubscribes",
                          unsubscribe: "ManageSubscribes",
                          addParticipants: "ManageParticipants",
                          editParticipants: "ManageParticipants",
                          manageNotification: "ManageNotifications",
                          getPublicConversations: "GetConversations",
                          retransmitEvents: "RetransmitRequest"
                      },
                      i = (new v.default).toString(),
                      o = {
                          service: p.MsgService.Chat,
                          event: e,
                          payload: Object.assign(t, {
                              "@type": "type/vox.store." + n + "." + (r[e] || this.capitalize(e))
                          }),
                          request_uuid: i
                      };
                  return this.query.push(o), i
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "MsgSignaling"
              }
          }], [{
              key: "get",
              value: function() {
                  return t.instance = t.instance || new t, t.instance
              }
          }]), t
      }(f.EventTarget);
  l([u.LogManager.d_trace(u.LogCategory.MESSAGING)], h.prototype, "handleWsData", null), l([u.LogManager.d_trace(u.LogCategory.MESSAGING)], h.prototype, "sendWsMessage", null), t.MsgSignaling = h
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var a, s = n(25),
      c = n(34),
      l = n(26);
  ! function(e) {
      function t() {
          return n.getInstance()
      }
      e.getInstance = t;
      var n = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(s.Messenger);
      e.Messenger = n;
      var a = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(c.Conversation);
      e.Conversation = a;
      var u = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), t
      }(l.Message);
      e.Message = u;
      ! function(e) {
          e.UNKNOWN = "UNKNOWN", e.createConversation = "createConversation", e.editConversation = "editConversation", e.removeConversation = "removeConversation", e.joinConversation = "joinConversation", e.leaveConversation = "leaveConversation", e.getConversation = "getConversation", e.getConversations = "getConversations", e.getPublicConversations = "getPublicConversations", e.searchConversations = "searchConversations", e.removeEmptyConversation = "removeEmptyConversation", e.addParticipants = "addParticipants", e.editParticipants = "editParticipants", e.removeParticipants = "removeParticipants", e.getUser = "getUser", e.getUsers = "getUsers", e.editUser = "editUser", e.setStatus = "setStatus", e.sendMessage = "sendMessage", e.editMessage = "editMessage", e.removeMessage = "removeMessage", e.typingMessage = "typingMessage", e.isRead = "isRead", e.subscribe = "subscribe", e.unsubscribe = "unsubscribe", e.manageNotification = "manageNotification", e.getSubscriptionList = "getSubscriptionList", e.createBot = "createBot", e.removeBot = "removeBot", e.retransmitEvents = "retransmitEvents"
      }(e.MessengerAction || (e.MessengerAction = {}));
      ! function(e) {
          e.CreateConversation = "CreateConversation", e.EditConversation = "EditConversation", e.RemoveConversation = "RemoveConversation", e.GetConversation = "GetConversation", e.GetPublicConversations = "GetPublicConversations", e.SendMessage = "SendMessage", e.EditMessage = "EditMessage", e.RemoveMessage = "RemoveMessage", e.Typing = "Typing", e.EditUser = "EditUser", e.GetUser = "GetUser", e.Error = "Error", e.RetransmitEvents = "RetransmitEvents", e.Read = "Read", e.Subscribe = "Subscribe", e.Unsubscribe = "Unsubscribe", e.SetStatus = "SetStatus", e.GetSubscriptionList = "GetSubscriptionList", e.CreateBot = "CreateBot", e.RemoveBot = "RemoveBot"
      }(e.MessengerEvents || (e.MessengerEvents = {}));
      ! function(e) {
          e[e.Error_0 = 0] = "Error_0", e[e.Error_1 = 1] = "Error_1", e[e.Error_2 = 2] = "Error_2", e[e.Error_3 = 3] = "Error_3", e[e.Error_8 = 8] = "Error_8", e[e.Error_10 = 10] = "Error_10", e[e.Error_11 = 11] = "Error_11", e[e.Error_12 = 12] = "Error_12", e[e.Error_13 = 13] = "Error_13", e[e.Error_15 = 15] = "Error_15", e[e.Error_16 = 16] = "Error_16", e[e.Error_18 = 18] = "Error_18", e[e.Error_19 = 19] = "Error_19", e[e.Error_21 = 21] = "Error_21", e[e.Error_22 = 22] = "Error_22", e[e.Error_23 = 23] = "Error_23", e[e.Error_24 = 24] = "Error_24", e[e.Error_25 = 25] = "Error_25", e[e.Error_26 = 26] = "Error_26", e[e.Error_28 = 28] = "Error_28", e[e.Error_30 = 30] = "Error_30", e[e.Error_32 = 32] = "Error_32", e[e.Error_33 = 33] = "Error_33", e[e.Error_34 = 34] = "Error_34", e[e.Error_35 = 35] = "Error_35", e[e.Error_36 = 36] = "Error_36", e[e.Error_37 = 37] = "Error_37", e[e.Error_38 = 38] = "Error_38", e[e.Error_39 = 39] = "Error_39", e[e.Error_40 = 40] = "Error_40", e[e.Error_41 = 41] = "Error_41", e[e.Error_42 = 42] = "Error_42", e[e.Error_43 = 43] = "Error_43", e[e.Error_500 = 500] = "Error_500"
      }(e.MessengerError || (e.MessengerError = {}))
  }(a = t.Messaging || (t.Messaging = {})), t.default = a
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(1),
      l = n(11),
      u = n(4),
      d = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "Logger"
              }
          }], [{
              key: "cadScript",
              value: function(e) {
                  return e.split(";").map(function(e) {
                      if (0 !== e.length) {
                          var t = e.match(/\([0-9\/\.,\*\+]*\)$/),
                              n = e.substring(0, t.index),
                              r = t.pop();
                          if (t.length) throw new Error("cadence script should be of the form `%f(%f/%f[,%f/%f])`");
                          if (n = "*" === n ? 1 / 0 : parseFloat(n), isNaN(n)) throw new Error("cadence length should be of the form `%f`");
                          return r = r.slice(1, r.length - 1).split(",").map(function(e) {
                              try {
                                  var t = e.split("/");
                                  if (t.length > 3) throw new Error;
                                  return t = t.map(function(e, t) {
                                      if (2 === t) return e.split("+").map(function(e) {
                                          var t = parseInt(e, 10);
                                          if (isNaN(t)) throw new Error;
                                          return t - 1
                                      });
                                      var n;
                                      if ("*" == e && (n = 1 / 0), n = n || parseFloat(e), isNaN(n)) throw new Error;
                                      return n
                                  }), {
                                      on: t[0],
                                      off: t[1],
                                      frequencies: t[2]
                                  }
                              } catch (e) {
                                  throw new Error("cadence segments should be of the form `%f/%f[%d[+%d]]`")
                              }
                          }), {
                              duration: n,
                              sections: r
                          }
                      }
                  })
              }
          }, {
              key: "freqScript",
              value: function(e) {
                  return e.split(",").map(function(e) {
                      try {
                          var t = e.split("@"),
                              n = parseInt(t.shift()),
                              r = parseFloat(t.shift());
                          if (t.length) throw Error();
                          return {
                              frequency: n,
                              decibels: r
                          }
                      } catch (e) {
                          throw new Error("freqScript pairs are expected to be of the form `%d@%f[,%d@%f]`")
                      }
                  })
              }
          }, {
              key: "toneScript",
              value: function(e) {
                  var t = e.split(";");
                  return {
                      frequencies: this.freqScript(t.shift()),
                      cadences: this.cadScript(t.join(";"))
                  }
              }
          }, {
              key: "playToneScript",
              value: function(e) {
                  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                  if (void 0 !== window.AudioContext || void 0 !== window.webkitAudioContext) {
                      var n = u.default.AudioDeviceManager.get().getAudioContext();
                      if (null === n) return;
                      var r = this.toneScript(e),
                          i = [],
                          o = 0,
                          a = function(e) {
                              for (var t = 0; t < n.sampleRate * e; t++) i.push(0)
                          },
                          s = function(e, t) {
                              for (var o = 0; o < n.sampleRate * t; o++) {
                                  for (var a = 0, s = 0; s < e.length; s++) a += Math.pow(10, r.frequencies[e[s]].decibels / 20) * Math.sin((i.length + o) * (3.14159265359 / n.sampleRate) * r.frequencies[e[s]].frequency), o < 10 && (a *= o / 10), o > n.sampleRate * t - 10 && (a *= (n.sampleRate * t - o) / 10);
                                  i.push(a)
                              }
                          },
                          c = function(e, t) {
                              if (t != 1 / 0) var n = t;
                              else n = t = 20;
                              if (0 !== e.off && e.off != 1 / 0)
                                  for (; n > 0;) {
                                      s(e.frequencies, e.on), n -= e.on, a(e.off), n -= e.off;
                                      n = parseInt(String(10 * n)) / 10
                                  } else s(e.frequencies, t)
                          };
                      this.source = n.createBufferSource();
                      for (var l = 0; l < r.cadences.length; l++) r.cadences[l].duration == 1 / 0 && (this.source.loop = !0),
                          function(e) {
                              e.duration != 1 / 0 ? o += e.duration : o += 20;
                              for (var t = 0; t < e.sections.length; t++) c(e.sections[t], e.duration)
                          }(r.cadences[l]);
                      this.source.connect(n.destination);
                      for (var d = n.createBuffer(1, o * n.sampleRate, n.sampleRate), g = d.getChannelData(0), f = 0; f < o * n.sampleRate; f++) g[f] = i[f];
                      i = null, this.source.buffer = d, !0 === t && (this.source.loop = !0), this.source.start(0)
                  }
              }
          }, {
              key: "stopPlayback",
              value: function() {
                  return void 0 !== this.source && null !== this.source && (this.source.stop(0), this.source = null, !0)
              }
          }, {
              key: "getServers",
              value: function() {
                  arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                  return fetch("https://balancer.voximplant.com/getNearestHost").then(function(e) {
                      return e.text()
                  })
              }
          }, {
              key: "generateUUID",
              value: function() {
                  var e = this._gri,
                      t = this._ha;
                  return t(e(32), 8) + "-" + t(e(16), 4) + "-" + t(16384 | e(12), 4) + "-" + t(32768 | e(14), 4) + "-" + t(e(48), 12)
              }
          }, {
              key: "_gri",
              value: function(e) {
                  return e < 0 ? NaN : e <= 30 ? 0 | Math.random() * (1 << e) : e <= 53 ? (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << e - 30)) * (1 << 30) : NaN
              }
          }, {
              key: "_ha",
              value: function(e, t) {
                  for (var n = e.toString(16), r = t - n.length, i = "0"; r > 0; r >>>= 1, i += i) 1 & r && (n = i + n);
                  return n
              }
          }, {
              key: "checkCA",
              value: function() {
                  if (!c.Client.getInstance().connected()) throw new Error("NOT_CONNECTED_TO_VOXIMPLANT");
                  if (!l.Authenticator.get().authorized()) throw new Error("NOT_AUTHORIZED")
              }
          }, {
              key: "mixObjectToLeft",
              value: function(e, t) {
                  for (var n in e) void 0 !== t[n] && (e[n] = t[n]);
                  return e
              }
          }, {
              key: "strFormat",
              value: function(e) {
                  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                  return e.replace(/{(\d+)}/g, function(e, t) {
                      return void 0 !== n[t] ? n[t] : e
                  })
              }
          }]), e
      }();
  d.source = null, a([s.LogManager.d_trace(s.LogCategory.UTILS)], d, "cadScript", null), a([s.LogManager.d_trace(s.LogCategory.UTILS)], d, "freqScript", null), a([s.LogManager.d_trace(s.LogCategory.UTILS)], d, "toneScript", null), a([s.LogManager.d_trace(s.LogCategory.UTILS)], d, "playToneScript", null), a([s.LogManager.d_trace(s.LogCategory.UTILS)], d, "stopPlayback", null), a([s.LogManager.d_trace(s.LogCategory.UTILS)], d, "getServers", null), t.Utils = d
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(2),
      a = n(3),
      s = function() {
          function e(t) {
              r(this, e), this._id = t
          }
          return i(e, [{
              key: "insertDTMF",
              value: function(e, t, n) {
                  var r = this;
                  ("" + e).split("").forEach(function(e) {
                      return r.sendKey(e)
                  })
              }
          }, {
              key: "sendKey",
              value: function(e) {
                  var t = void 0;
                  ((t = "*" == e ? 10 : "#" == e ? 11 : parseInt(e)) >= 0 || t <= 11) && o.VoxSignaling.get().callRemoteFunction(a.RemoteFunction.sendDTMF, this._id, t)
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "SignalingDTMFSender"
              }
          }]), e
      }();
  t.SignalingDTMFSender = s
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s, c = n(0),
      l = n(2),
      u = n(6),
      d = n(12),
      g = n(10),
      f = n(3),
      p = n(32),
      v = n(1),
      h = n(4);
  ! function(e) {
      e[e.IDLE = 0] = "IDLE", e[e.REMOTEOFFER = 1] = "REMOTEOFFER", e[e.LOCALOFFER = 2] = "LOCALOFFER", e[e.ESTABLISHING = 3] = "ESTABLISHING", e[e.ESTABLISHED = 4] = "ESTABLISHED", e[e.CLOSED = 5] = "CLOSED"
  }(s = t.PeerConnectionState || (t.PeerConnectionState = {}));
  var m;
  ! function(e) {
      e[e.CLIENT_SERVER_V1 = 0] = "CLIENT_SERVER_V1", e[e.P2P = 1] = "P2P", e[e.CONFERENCE = 2] = "CONFERENCE"
  }(m = t.PeerConnectionMode || (t.PeerConnectionMode = {}));
  var y = function() {
      function e(t, n, i) {
          r(this, e), this.id = t, this.mode = n, this.videoEnabled = i, this.onHold = !1, this.muteMicState = !1, this.SEND_CANDIDATE_DELAY = 1e3, this.mediaRepository = [], this.candidateList = [], this.localCandidateTimer = -1, this.logger = c.LogManager.get().createLogger(c.LogCategory.RTC, this._traceName() + " " + t), this.logger.info("PC created"), this.state = s.IDLE, this.pendingCandidates = [], "_default" !== t && u.CallManager.get().calls[t] && (this.reInviteQ = new p.ReInviteQ(u.CallManager.get().calls[t], this._canReInvite))
      }
      return i(e, [{
          key: "getId",
          value: function() {
              return this.id
          }
      }, {
          key: "getState",
          value: function() {
              return this.state
          }
      }, {
          key: "processRemoteAnswer",
          value: function(e, t) {
              return this.state = s.ESTABLISHING, this._processRemoteAnswer(e, t)
          }
      }, {
          key: "getLocalOffer",
          value: function() {
              return this.state === s.IDLE || this.state === s.ESTABLISHED || s.LOCALOFFER ? (this.logger.info("getLocalOffer()"), this.state = s.LOCALOFFER, this._getLocalOffer()) : (this.logger.error("getLocalOffer() in state " + s[this.state]), new Promise(function(e, t) {
                  t("Invalid state")
              }))
          }
      }, {
          key: "getLocalAnswer",
          value: function() {
              return this._getLocalAnswer()
          }
      }, {
          key: "processRemoteOffer",
          value: function(e) {
              return this.state === s.IDLE || this.state === s.ESTABLISHED ? (this.state = s.ESTABLISHING, this._processRemoteOffer(e)) : (this.logger.error("processRemoteOffer() in state " + s[this.state]), new Promise(function(e, t) {
                  t("Invalid state")
              }))
          }
      }, {
          key: "close",
          value: function() {
              this.logger.info("close()"), this._close()
          }
      }, {
          key: "addRemoteCandidate",
          value: function(e, t) {
              return this.logger.info("addRemoteCandidate(" + e + ", " + t + ")"), this._addRemoteCandidate(e, t)
          }
      }, {
          key: "handleReinvite",
          value: function(e, t, n) {
              return this._handleReinvite(e, t, n)
          }
      }, {
          key: "addCandidateToSend",
          value: function(e, t) {
              this.pendingCandidates.push([t, e]), this.canSendCandidates && this.startCandidateSendTimer()
          }
      }, {
          key: "canStartSendingCandidates",
          value: function() {
              this.canSendCandidates = !0, this.startCandidateSendTimer()
          }
      }, {
          key: "sendDTMF",
          value: function(e) {
              this._sendDTMF(e, 500, 50)
          }
      }, {
          key: "setVideoEnabled",
          value: function(e) {
              var t = this.videoEnabled.receiveVideo;
              this.videoEnabled = e, t != e.receiveVideo && this._hold(this.onHold)
          }
      }, {
          key: "setVideoFlags",
          value: function(e) {
              this.videoEnabled = e
          }
      }, {
          key: "getDirections",
          value: function() {
              return this._getDirections()
          }
      }, {
          key: "setHoldKey",
          value: function(e) {
              this.onHold = e
          }
      }, {
          key: "getTrackKind",
          value: function() {
              return this._call ? h.default.StreamManager.get()._getTracksKind(this._call) : {}
          }
      }, {
          key: "sendMedia",
          value: function(e, t) {
              var n = this;
              return new Promise(function(e, t) {
                  if (n.onHold) return void t({
                      result: !1,
                      call: n._call
                  });
                  n.reInviteQ.add({
                      fx: function() {
                          v.Client.getInstance().config();
                          h.default.StreamManager.get().updateCallStream(n._call)
                      },
                      reject: t,
                      resolve: function(t) {
                          n.restoreMute(), e(t)
                      }
                  })
              })
          }
      }, {
          key: "hold",
          value: function(e) {
              var t = this;
              return new Promise(function(n, r) {
                  t.onHold === e && n({
                      call: t._call,
                      name: "Updated",
                      result: !0
                  }), t.reInviteQ.add({
                      fx: function() {
                          t._hold(e)
                      },
                      reject: r,
                      resolve: function(e) {
                          t.restoreMute(), n(e)
                      }
                  })
              })
          }
      }, {
          key: "hdnFRS",
          value: function() {
              var e = this;
              return new Promise(function(t, n) {
                  if (e.onHold) return void n({
                      result: !1,
                      call: e._call
                  });
                  e.reInviteQ.add({
                      fx: function() {
                          e._hdnFRS()
                      },
                      reject: n,
                      resolve: function(n) {
                          e.restoreMute(), t(n)
                      }
                  })
              })
          }
      }, {
          key: "muteMicrophone",
          value: function(e) {
              var t = this;
              this.muteMicState !== e && (this.muteMicState = e, h.default.StreamManager.get().getCallStream(this._call).then(function(e) {
                  e.getAudioTracks().forEach(function(e) {
                      e.enabled = !t.muteMicState
                  })
              }))
          }
      }, {
          key: "restoreMute",
          value: function() {
              var e = this;
              if (this._call.settings.active) {
                  var t = this;
                  setTimeout(function() {
                      e._call.settings.state !== d.CallState.ENDED && (e._call.restoreRMute(), h.default.StreamManager.get().getCallStream(e._call).then(function(e) {
                          e.getAudioTracks().forEach(function(e) {
                              e.enabled = !t.muteMicState
                          })
                      }))
                  }, 300)
              }
          }
      }, {
          key: "restoreVideoSending",
          value: function() {
              var e = this;
              this._call.settings.active && setTimeout(function() {
                  e._call.settings.state !== d.CallState.ENDED && e.enableVideo(e._call.settings.videoDirections.sendVideo)
              }, 0)
          }
      }, {
          key: "addCustomMedia",
          value: function(e) {
              var t = this;
              return new Promise(function(n, r) {
                  t.reInviteQ.add({
                      fx: function() {
                          t._addCustomMedia(e)
                      },
                      reject: r,
                      resolve: function(e) {
                          t.restoreMute(), n()
                      }
                  })
              })
          }
      }, {
          key: "fastAddCustomMedia",
          value: function(e) {
              this._addCustomMedia(e)
          }
      }, {
          key: "fastRemoveCustomMedia",
          value: function(e) {
              this._removeCustomMedia(e)
          }
      }, {
          key: "removeCustomMedia",
          value: function(e) {
              var t = this;
              return new Promise(function(n, r) {
                  t.reInviteQ.add({
                      fx: function() {
                          t._removeCustomMedia(e)
                      },
                      reject: r,
                      resolve: function(e) {
                          t.restoreMute(), n()
                      }
                  })
              })
          }
      }, {
          key: "updateCustomMedia",
          value: function(e) {
              this._updateCustomMedia(e)
          }
      }, {
          key: "setState",
          value: function(e) {
              this.logger.info("Transmitting from " + s[this.state] + " to " + s[e]), this.state = e
          }
      }, {
          key: "sendLocalCandidateToPeer",
          value: function(e, t) {
              var n = this;
              this._call = u.CallManager.get().calls[this.id], this.mode === m.CLIENT_SERVER_V1 ? l.VoxSignaling.get().callRemoteFunction(f.RemoteFunction.addCandidate, this.id, e, t) : (this.candidateList.push([t, e]), this.localCandidateTimer <= 0 && (this.localCandidateTimer = window.setTimeout(function() {
                  window.clearTimeout(n.localCandidateTimer), n.localCandidateTimer = -1, u.CallManager.get().calls[n.id] && u.CallManager.get().calls[n.id].sendInfo(g.Constants.P2P_SPD_FRAG_MIME_TYPE, JSON.stringify(n.candidateList), {}), n.candidateList = []
              }, 200)))
          }
      }, {
          key: "startCandidateSendTimer",
          value: function() {
              var e = this;
              null !== this.candidateSendTimer && void 0 !== this.candidateSendTimer || (this.candidateSendTimer = setTimeout(function() {
                  e.candidateSendTimer = null, e.pendingCandidates.length > 0 && u.CallManager.get().calls[e.id] && u.CallManager.get().calls[e.id].sendInfo(g.Constants.P2P_SPD_FRAG_MIME_TYPE, JSON.stringify(e.pendingCandidates), {}), e.pendingCandidates = []
              }, this.SEND_CANDIDATE_DELAY))
          }
      }, {
          key: "_traceName",
          value: function() {
              return "PeerConnection"
          }
      }, {
          key: "remoteStreams",
          get: function() {
              return this._remoteStreams
          }
      }]), e
  }();
  a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "getState", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "processRemoteAnswer", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "getLocalOffer", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "getLocalAnswer", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "processRemoteOffer", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "close", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "addRemoteCandidate", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "handleReinvite", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "addCandidateToSend", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "canStartSendingCandidates", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "sendDTMF", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "setVideoEnabled", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "setVideoFlags", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "setHoldKey", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "getTrackKind", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "sendMedia", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "hold", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "hdnFRS", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "muteMicrophone", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "restoreMute", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "restoreVideoSending", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "addCustomMedia", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "fastAddCustomMedia", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "fastRemoveCustomMedia", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "removeCustomMedia", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "updateCustomMedia", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "setState", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "sendLocalCandidateToPeer", null), a([c.LogManager.d_trace(c.LogCategory.RTC)], y.prototype, "startCandidateSendTimer", null), t.PeerConnection = y
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(8),
      a = n(52),
      s = n(53),
      c = function() {
          function e() {
              throw r(this, e), new Error("Please, use the EndpointManager.get() instead create new object")
          }
          return i(e, null, [{
              key: "get",
              value: function() {
                  return void 0 === this.instance && (o.PCFactory.hasTransceivers ? e.instance = new a.TransceiversEndpointManager : e.instance = new s.PlainEndpointManager), this.instance
              }
          }]), e
      }();
  t.EndpointManager = c
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e.onError = "onError", e.onCreateConversation = "onCreateConversation", e.onEditConversation = "onEditConversation", e.onRemoveConversation = "onRemoveConversation", e.onGetConversation = "onGetConversation", e.onGetPublicConversations = "onGetPublicConversations", e.onGetUser = "onGetUser", e.onEditUser = "onEditUser", e.onSetStatus = "onSetStatus", e.onSendMessage = "onSendMessage", e.onEditMessage = "onEditMessage", e.onRemoveMessage = "onRemoveMessage", e.isRead = "isRead", e.onTyping = "onTyping", e.onSubscribe = "onSubscribe", e.onUnsubscribe = "onUnsubscribe", e.onGetSubscriptionList = "onGetSubscriptionList", e.onCreateBot = "onCreateBot", e.onRemoveBot = "onRemoveBot", e.onRetransmitEvents = "onRetransmitEvents"
  }(t.MsgEvent || (t.MsgEvent = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(18),
      l = n(24),
      u = n(44),
      d = n(34),
      g = n(26),
      f = n(19),
      p = n(11),
      v = n(45),
      h = n(27),
      m = {
          0: "Something went wrong. Please check your input or required parameters."
      },
      y = function() {
          function e() {
              var t = this;
              if (r(this, e), e.instance) throw new Error(v.MESSAGING_ERR_1);
              this.eventListeners = {}, this.awaitPromiseList = {}, this.cm = u.default.get(), this.signalling = c.MsgSignaling.get(), this.signalling.addEventListener(l.MsgEvent.onError, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.Error, {
                      initiator: t.currentUserId,
                      code: e.code,
                      description: e.description,
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      timestamp: "number" == typeof e.timestamp ? 1e3 * e.timestamp : void 0,
                      requestUuid: n
                  }, n)
              }), this.signalling.addEventListener(l.MsgEvent.onEditUser, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.EditUser, {
                      user: {
                          userId: Number(e.object.user_id),
                          userName: e.object.user_name,
                          displayName: e.object.display_name,
                          conversationsList: e.object.conversations_list,
                          notificationEvents: e.object.notification_events ? e.object.notification_events.map(t.msgEventToMessengerEvent) : void 0,
                          customData: e.object.custom_data,
                          privateCustomData: e.object.private_custom_data
                      },
                      initiator: Number(e.initiator),
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      timestamp: "number" == typeof e.timestamp ? 1e3 * e.timestamp : void 0,
                      requestUuid: n
                  }, n)
              }), this.signalling.addEventListener(l.MsgEvent.onGetUser, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.GetUser, {
                      user: {
                          userId: Number(e.object.user_id),
                          userName: e.object.user_name,
                          displayName: e.object.display_name,
                          conversationsList: e.object.conversations_list,
                          notificationEvents: e.object.notification_events ? e.object.notification_events.map(t.msgEventToMessengerEvent) : void 0,
                          customData: e.object.custom_data,
                          privateCustomData: e.object.private_custom_data
                      },
                      initiator: Number(e.initiator),
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      requestUuid: n
                  }, n)
              }), this.signalling.addEventListener(l.MsgEvent.onSetStatus, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.SetStatus, {
                      online: e.object.online,
                      initiator: Number(e.initiator),
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      timestamp: "number" == typeof e.timestamp ? 1e3 * e.timestamp : void 0,
                      requestUuid: n
                  }, n)
              }), this.signalling.addEventListener(l.MsgEvent.onSubscribe, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.Subscribe, {
                      users: e.object.user_id,
                      initiator: Number(e.initiator),
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      requestUuid: n
                  }, n)
              }), this.signalling.addEventListener(l.MsgEvent.onUnsubscribe, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.Unsubscribe, {
                      users: e.object.user_id,
                      initiator: Number(e.initiator),
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      requestUuid: n
                  }, n)
              }), this.signalling.addEventListener(l.MsgEvent.onGetSubscriptionList, function(e, n) {
                  t._dispatchEvent(f.default.MessengerEvents.GetSubscriptionList, {
                      users: e.object.subscriptions,
                      initiator: Number(e.initiator),
                      messengerAction: f.default.MessengerAction[e.on_incoming_event],
                      requestUuid: n
                  }, n)
              })
          }
          return i(e, [{
              key: "addEventListener",
              value: function(e, t) {
                  void 0 === this.eventListeners[e] && (this.eventListeners[e] = []), this.eventListeners[e].push(t)
              }
          }, {
              key: "removeEventListener",
              value: function(e, t) {
                  if (void 0 !== this.eventListeners[e])
                      if ("function" == typeof t) {
                          for (var n = 0; n < this.eventListeners[e].length; n++)
                              if (this.eventListeners[e][n] === t) {
                                  this.eventListeners[e].splice(n, 1);
                                  break
                              }
                      } else this.eventListeners[e] = []
              }
          }, {
              key: "on",
              value: function(e, t) {
                  this.addEventListener(e, t)
              }
          }, {
              key: "off",
              value: function(e, t) {
                  this.removeEventListener(e, t)
              }
          }, {
              key: "_dispatchEvent",
              value: function(e, t, n) {
                  void 0 !== this.eventListeners[e] && this.eventListeners[e].forEach(function(e) {
                      "function" == typeof e && e(t)
                  }), n && void 0 !== this.awaitPromiseList[n] && (e === f.default.MessengerEvents.Error && "function" == typeof this.awaitPromiseList[n].reject && this.awaitPromiseList[n].reject(t), "function" == typeof this.awaitPromiseList[n].resolve && this.awaitPromiseList[n].resolve(t), window.clearTimeout(this.awaitPromiseList[n].expire)), void 0 !== this.eventListeners[e] && 0 != this.eventListeners[e].length || s.LogManager.get().writeMessage(s.LogCategory.MESSAGING, "", s.LogLevel.INFO, "The " + e + " event dispatched, but no handler registered for this event type.")
              }
          }, {
              key: "_registerPromise",
              value: function(t, n, r) {
                  this.awaitPromiseList[t] = {
                      resolve: n,
                      reject: r,
                      expire: window.setTimeout(r, e.rejectTimeout)
                  }
              }
          }, {
              key: "getConversation",
              value: function(e) {
                  return this.cm.getConversation(e)
              }
          }, {
              key: "getConversations",
              value: function(e) {
                  return Array.isArray(e) && e.length > 30 ? void s.LogManager.get().writeMessage(s.LogCategory.MESSAGING, "Rate limit", s.LogLevel.ERROR, "you can get maximum 30 conversation in a single getConversations call") : this.cm.getConversations(e)
              }
          }, {
              key: "getPublicConversations",
              value: function() {
                  return this.cm.getPublicConversations()
              }
          }, {
              key: "getRawConversations",
              value: function(e) {
                  return this.cm.getConversations(e)
              }
          }, {
              key: "createConversation",
              value: function(e, t, n, r, i, o) {
                  return this.cm.createConversation(e, t, n, r, i, o)
              }
          }, {
              key: "createConversationFromCache",
              value: function(e) {
                  return e && "object" === (void 0 === e ? "undefined" : o(e)) ? d.Conversation.createFromCache(e) : null
              }
          }, {
              key: "joinConversation",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = n.signalling.sendWsMessage(h.MsgAction.joinConversation, {
                          uuid: t
                      });
                      e.getInstance()._registerPromise(o, r, i)
                  })
              }
          }, {
              key: "leaveConversation",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = n.signalling.sendWsMessage(h.MsgAction.leaveConversation, {
                          uuid: t
                      });
                      e.getInstance()._registerPromise(o, r, i)
                  })
              }
          }, {
              key: "getMe",
              value: function() {
                  return u.default.extractUserName(p.Authenticator.get().username())
              }
          }, {
              key: "getMyId",
              value: function() {
                  return this.currentUserId ? Promise.resolve(this.currentUserId) : this.getUser(this.getMe()).then(function(e) {
                      return e.user.userId
                  })
              }
          }, {
              key: "getUser",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = void 0,
                          a = function e(t) {
                              t.requestUuid === o && (clearTimeout(c), n.off(f.default.MessengerEvents.GetUser, e), n.off(f.default.MessengerEvents.Error, s), t.user.userName === n.getMe() && (n.currentUserId = Number(t.user.userId)), r(t))
                          },
                          s = function e(t) {
                              t.requestUuid === o && (clearTimeout(c), n.off(f.default.MessengerEvents.GetUser, a), n.off(f.default.MessengerEvents.Error, e), i(t))
                          },
                          c = setTimeout(function() {
                              e.getInstance().off(f.default.MessengerEvents.GetUser, a), e.getInstance().off(f.default.MessengerEvents.Error, s), e.getInstance().reject(f.default.MessengerError.Error_0, f.default.MessengerAction.getUser).catch(i)
                          }, e.rejectTimeout);
                      n.on(f.default.MessengerEvents.GetUser, a), n.on(f.default.MessengerEvents.Error, s), o = n.signalling.sendWsMessage(h.MsgAction.getUser, {
                          user_name: t
                      })
                  })
              }
          }, {
              key: "getUserById",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = n.signalling.sendWsMessage(h.MsgAction.getUser, {
                          user_id: t
                      });
                      e.getInstance()._registerPromise(o, r, i)
                  })
              }
          }, {
              key: "getUsers",
              value: function(t) {
                  if (!Array.isArray(t)) return e.getInstance().reject(f.default.MessengerError.Error_0, f.default.MessengerAction.getUsers);
                  var n = void 0,
                      r = Promise.all(t.map(function(t) {
                          return new Promise(function(r, i) {
                              var o = function i(o) {
                                      o.requestUuid === n && o.user.userName === t && (clearTimeout(s), e.getInstance().off(f.default.MessengerEvents.GetUser, i), e.getInstance().off(f.default.MessengerEvents.Error, a), r(o))
                                  },
                                  a = function t(r) {
                                      r.requestUuid === n && (clearTimeout(s), e.getInstance().off(f.default.MessengerEvents.GetUser, o), e.getInstance().off(f.default.MessengerEvents.Error, t), i(r))
                                  },
                                  s = setTimeout(function() {
                                      e.getInstance().off(f.default.MessengerEvents.GetUser, o), e.getInstance().off(f.default.MessengerEvents.Error, a), e.getInstance().reject(f.default.MessengerError.Error_0, f.default.MessengerAction.getUsers).catch(i)
                                  }, e.rejectTimeout);
                              e.getInstance().on(f.default.MessengerEvents.GetUser, o), e.getInstance().on(f.default.MessengerEvents.Error, a)
                          })
                      }));
                  return n = this.signalling.sendWsMessage(h.MsgAction.getUsers, {
                      users: t.map(function(e) {
                          return {
                              user_name: e
                          }
                      })
                  }), r
              }
          }, {
              key: "getUsersById",
              value: function(t) {
                  if (!Array.isArray(t)) return e.getInstance().reject(f.default.MessengerError.Error_0, f.default.MessengerAction.getUsers);
                  var n = void 0,
                      r = Promise.all(t.map(function(t) {
                          return new Promise(function(r, i) {
                              var o = function i(o) {
                                      o.requestUuid === n && o.user.userId === t && (clearTimeout(s), e.getInstance().off(f.default.MessengerEvents.GetUser, i), e.getInstance().off(f.default.MessengerEvents.Error, a), r(o))
                                  },
                                  a = function t(r) {
                                      r.requestUuid === n && (clearTimeout(s), e.getInstance().off(f.default.MessengerEvents.GetUser, o), e.getInstance().off(f.default.MessengerEvents.Error, t), i(r))
                                  },
                                  s = setTimeout(function() {
                                      e.getInstance().off(f.default.MessengerEvents.GetUser, o), e.getInstance().off(f.default.MessengerEvents.Error, a), e.getInstance().reject(f.default.MessengerError.Error_0, f.default.MessengerAction.getUsers).catch(i)
                                  }, e.rejectTimeout);
                              e.getInstance().on(f.default.MessengerEvents.GetUser, o), e.getInstance().on(f.default.MessengerEvents.Error, a)
                          })
                      }));
                  return n = this.signalling.sendWsMessage(h.MsgAction.getUsers, {
                      users: t.map(function(e) {
                          return {
                              user_id: e
                          }
                      })
                  }), r
              }
          }, {
              key: "editUser",
              value: function(t, n) {
                  var r = this,
                      i = {};
                  return t && (i.custom_data = t), n && (i.private_custom_data = n), new Promise(function(t, n) {
                      var o = r.signalling.sendWsMessage(h.MsgAction.editUser, i);
                      e.getInstance()._registerPromise(o, t, n)
                  })
              }
          }, {
              key: "setStatus",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = n.signalling.sendWsMessage(h.MsgAction.setStatus, {
                          online: t
                      });
                      e.getInstance()._registerPromise(o, r, i)
                  })
              }
          }, {
              key: "subscribe",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = n.signalling.sendWsMessage(h.MsgAction.subscribe, {
                          user_id: t
                      });
                      e.getInstance()._registerPromise(o, r, i)
                  })
              }
          }, {
              key: "unsubscribe",
              value: function(t, n) {
                  var r = this;
                  return new Promise(function(i, o) {
                      var a = r.signalling.sendWsMessage(h.MsgAction.unsubscribe, {
                          user_id: t,
                          all: n
                      });
                      e.getInstance()._registerPromise(a, i, o)
                  })
              }
          }, {
              key: "getSubscriptionList",
              value: function() {
                  var t = this;
                  return new Promise(function(n, r) {
                      var i = t.signalling.sendWsMessage(h.MsgAction.getSubscriptionList, {});
                      e.getInstance()._registerPromise(i, n, r)
                  })
              }
          }, {
              key: "manageNotification",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      var o = n.signalling.sendWsMessage(h.MsgAction.manageNotification, {
                          notifications: t.map(function(e) {
                              return e === f.default.MessengerEvents.CreateConversation ? l.MsgEvent.onCreateConversation : e === f.default.MessengerEvents.SendMessage ? l.MsgEvent.onSendMessage : e === f.default.MessengerEvents.EditMessage ? l.MsgEvent.onEditMessage : void 0
                          })
                      });
                      e.getInstance()._registerPromise(o, r, i)
                  })
              }
          }, {
              key: "createMessageFromCache",
              value: function(e) {
                  return e && "object" === (void 0 === e ? "undefined" : o(e)) ? g.Message.createFromCache(e) : null
              }
          }, {
              key: "reject",
              value: function(e, t) {
                  var n = {
                      code: e,
                      description: m[e],
                      initiator: this.currentUserId,
                      messengerAction: t
                  };
                  return this._dispatchEvent(f.default.MessengerEvents.Error, n), Promise.reject(n)
              }
          }, {
              key: "msgEventToMessengerEvent",
              value: function(e) {
                  return e === l.MsgEvent.onCreateConversation ? f.default.MessengerEvents.CreateConversation : e === l.MsgEvent.onSendMessage ? f.default.MessengerEvents.SendMessage : e === l.MsgEvent.onEditMessage ? f.default.MessengerEvents.EditMessage : e
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "Messenger"
              }
          }], [{
              key: "getInstance",
              value: function() {
                  return e.instance = e.instance || new e, e.instance
              }
          }]), e
      }();
  y.rejectTimeout = 2e4, a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "addEventListener", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "removeEventListener", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "on", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "off", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "_dispatchEvent", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "_registerPromise", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getConversation", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getConversations", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getPublicConversations", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getRawConversations", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "createConversation", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "createConversationFromCache", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "joinConversation", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "leaveConversation", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getMe", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getMyId", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getUser", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getUserById", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getUsers", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getUsersById", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "editUser", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "setStatus", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "subscribe", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "unsubscribe", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "getSubscriptionList", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "manageNotification", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y.prototype, "createMessageFromCache", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], y, "getInstance", null), t.Messenger = y
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(18),
      l = n(27),
      u = n(25),
      d = function() {
          function e(t, n) {
              r(this, e), this._text = t, void 0 !== n && Array.isArray(n) && n.every(function(e) {
                  return e && "object" === (void 0 === e ? "undefined" : o(e))
              }) ? this._payload = n : this._payload = []
          }
          return i(e, [{
              key: "toCache",
              value: function() {
                  return {
                      uuid: this._uuid,
                      text: this._text,
                      payload: this._payload,
                      conversation: this._conversation,
                      sender: this._sender
                  }
              }
          }, {
              key: "getPayload",
              value: function() {
                  var e = {
                      text: this._text,
                      conversation: this._conversation
                  };
                  return void 0 !== this._payload && Array.isArray(this._payload) && this._payload.every(function(e) {
                      return "object" === (void 0 === e ? "undefined" : o(e))
                  }) ? e.payload = this._payload : e.payload = [], e
              }
          }, {
              key: "sendTo",
              value: function(e) {
                  var t = this;
                  return this._conversation = e.uuid, new Promise(function(e, n) {
                      var r = c.MsgSignaling.get().sendWsMessage(l.MsgAction.sendMessage, t.getPayload());
                      u.Messenger.getInstance()._registerPromise(r, e, n)
                  })
              }
          }, {
              key: "update",
              value: function() {
                  var e = this;
                  return new Promise(function(t, n) {
                      var r = c.MsgSignaling.get().sendWsMessage(l.MsgAction.editMessage, Object.assign(e.getPayload(), {
                          uuid: e._uuid
                      }));
                      u.Messenger.getInstance()._registerPromise(r, t, n)
                  })
              }
          }, {
              key: "remove",
              value: function() {
                  var e = this;
                  return new Promise(function(t, n) {
                      var r = c.MsgSignaling.get().sendWsMessage(l.MsgAction.removeMessage, {
                          uuid: e._uuid,
                          conversation: e.conversation
                      });
                      u.Messenger.getInstance()._registerPromise(r, t, n)
                  })
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "Message"
              }
          }, {
              key: "uuid",
              get: function() {
                  return this._uuid
              }
          }, {
              key: "conversation",
              get: function() {
                  return this._conversation
              }
          }, {
              key: "text",
              get: function() {
                  return this._text
              },
              set: function(e) {
                  this._text = e
              }
          }, {
              key: "payload",
              get: function() {
                  return this._payload
              },
              set: function(e) {
                  this._payload = e
              }
          }, {
              key: "sender",
              get: function() {
                  return this._sender
              }
          }], [{
              key: "_createFromBus",
              value: function(t, n) {
                  var r = new e(t.text, t.payload);
                  return r._uuid = t.uuid, r._conversation = t.conversation, r._sender = n, r
              }
          }, {
              key: "createFromCache",
              value: function(t) {
                  var n = new e(t.text, t.payload);
                  return n._uuid = t.uuid, n._conversation = t.conversation, n._sender = Number(t.sender), n
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d.prototype, "toCache", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d.prototype, "getPayload", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d.prototype, "sendTo", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d.prototype, "update", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d.prototype, "remove", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d, "_createFromBus", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], d, "createFromCache", null), t.Message = d
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e.UNKNOWN = "UNKNOWN", e.createConversation = "createConversation", e.editConversation = "editConversation", e.removeConversation = "removeConversation", e.joinConversation = "joinConversation", e.leaveConversation = "leaveConversation", e.getConversation = "getConversation", e.getConversations = "getConversations", e.getPublicConversations = "getPublicConversations", e.searchConversations = "searchConversations", e.removeEmptyConversation = "removeEmptyConversation", e.addParticipants = "addParticipants", e.editParticipants = "editParticipants", e.removeParticipants = "removeParticipants", e.getUser = "getUser", e.getUsers = "getUsers", e.editUser = "editUser", e.setStatus = "setStatus", e.sendMessage = "sendMessage", e.editMessage = "editMessage", e.removeMessage = "removeMessage", e.typingMessage = "typingMessage", e.isRead = "isRead", e.subscribe = "subscribe", e.unsubscribe = "unsubscribe", e.manageNotification = "manageNotification", e.getSubscriptionList = "getSubscriptionList", e.createBot = "createBot", e.removeBot = "removeBot", e.retransmitEvents = "retransmitEvents"
  }(t.MsgAction || (t.MsgAction = {}))
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.Offline = "OFFLINE"] = "Offline", e[e.Online = "ONLINE"] = "Online", e[e.Ready = "READY"] = "Ready", e[e.InService = "IN_SERVICE"] = "InService", e[e.AfterService = "AFTER_SERVICE"] = "AfterService", e[e.Timeout = "TIMEOUT"] = "Timeout", e[e.DND = "DND"] = "DND"
  }(t.OperatorACDStatuses || (t.OperatorACDStatuses = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      },
      c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var u = n(0),
      d = n(4),
      g = n(15),
      f = n(36),
      p = n(7),
      v = n(14),
      h = n(1),
      m = n(35),
      y = n(37),
      C = function(e) {
          function t() {
              r(this, t);
              var e = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              if (void 0 !== t.instance) throw new Error("Error - use StreamManager.get()");
              return e._callStreams = {}, e._localMediaRenderers = [], e._sharingStreams = {}, e.logger = u.LogManager.get().createLogger(u.LogCategory.HARDWARE, e._traceName()), e
          }
          return o(t, e), a(t, [{
              key: "getMirrorStream",
              value: function() {
                  var e = this;
                  return h.Client.getInstance().config().experiments && h.Client.getInstance().config().experiments.customMirrorMedia ? new Promise(function(t, n) {
                      h.Client.getInstance().config().experiments.customMirrorMedia({
                          videoSettings: f.CameraManager.get().getDefaultVideoSettings()
                      }).then(function(n) {
                          e._mirrorStream = n, e._mirrorStream.getTracks().forEach(function(t) {
                              t.onended = function() {
                                  e.onMirrorEnded()
                              }, t.onmute = function() {
                                  e.onMirrorEnded
                              }
                          }), t(n)
                      }).catch(function(e) {
                          n(e)
                      })
                  }) : new Promise(function(t, n) {
                      return void 0 !== e._mirrorStream && e._mirrorStream.active ? void t(e._mirrorStream) : p.default.isIphone() ? d.default.IOSCacheManager.get().getStream({
                          video: f.CameraManager.get().getCallConstraints("__local__"),
                          audio: m.AudioDeviceManager.get().getCallConstraints("__local__")
                      }).then(function(n) {
                          e._mirrorStream = n, e._mirrorStream.getTracks().forEach(function(t) {
                              t.onended = function() {
                                  e.onMirrorEnded()
                              }, t.onmute = function() {
                                  e.onMirrorEnded
                              }
                          }), t(n)
                      }, n) : navigator.mediaDevices.getUserMedia({
                          video: f.CameraManager.get().getCallConstraints("__local__")
                      }).then(function(n) {
                          e.logger.info("Media access granted"), e._mirrorStream = n, e._mirrorStream.getTracks().forEach(function(t) {
                              t.onended = function() {
                                  e.onMirrorEnded()
                              }, t.onmute = function() {
                                  e.onMirrorEnded
                              }
                          }), t(n)
                      }).catch(function(t) {
                          e.logger.error("Media access denied: " + (t ? t.message || t.name || t : "unknown"))
                      })
                  })
              }
          }, {
              key: "remMirrorStream",
              value: function() {
                  if (!p.default.isIphone()) {
                      if (void 0 === this._mirrorStream) return;
                      this._mirrorStream.getTracks().forEach(function(e) {
                          e.onended = void 0, e.onmute = void 0, e.stop()
                      }), this._mirrorStream = void 0
                  }
              }
          }, {
              key: "getCallStream",
              value: function(e) {
                  var t = this,
                      n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                  return h.Client.getInstance().config().experiments && h.Client.getInstance().config().experiments.customCallMedia ? new Promise(function(n, r) {
                      var i = !1,
                          o = m.AudioDeviceManager.get().getDefaultAudioSettings();
                      e && (i = !(!e.settings.videoDirections || !e.settings.videoDirections.sendVideo) && f.CameraManager.get().getCallVideoSettings(e), o = m.AudioDeviceManager.get().getCallAudioSettings(e));
                      var a = {
                          call: e,
                          audioSettings: o,
                          videoSettings: i
                      };
                      t.logger.info("[constraints]: " + JSON.stringify(a)), h.Client.getInstance().config().experiments.customCallMedia(a).then(function(e) {
                          t.logger.info("Media access granted"), h.Client.getInstance().dispatchEvent({
                              name: v.Events.MicAccessResult,
                              result: !0,
                              stream: e
                          }), n(e)
                      }).catch(function(e) {
                          t.logger.error("Media access denied: " + (e ? e.message || e.name || e : "unknown")), h.Client.getInstance().dispatchEvent({
                              name: v.Events.MicAccessResult,
                              result: !1,
                              stream: null
                          }), r(e)
                      })
                  }) : new Promise(function(r, i) {
                      var o = void 0 === e ? "__default" : e.id();
                      if (t._callStreams[o] && !n) r(t._callStreams[o]);
                      else {
                          var a = t._composeConstraints(e);
                          if (t.logger.info("[constraints]: " + JSON.stringify(a)), !a.audio && !a.video && "__default" !== o) return void r(null);
                          if ("firefox" !== p.default.getWSVendor()) p.default.isIphone() ? d.default.IOSCacheManager.get().getStream(a).then(function(e) {
                              t._callStreams[o] = e, e.getTracks().forEach(function(e) {
                                  e.onended = t.onCallEnded, e.onmute = t.onCallEnded
                              }), h.Client.getInstance().dispatchEvent({
                                  name: v.Events.MicAccessResult,
                                  result: !0,
                                  stream: e
                              }), r(e)
                          }) : navigator.mediaDevices.getUserMedia(a).then(function(e) {
                              t.logger.info("Media access granted"), t._callStreams[o] = e, e.getTracks().forEach(function(e) {
                                  e.onended = t.onCallEnded, e.onmute = t.onCallEnded
                              }), h.Client.getInstance().dispatchEvent({
                                  name: v.Events.MicAccessResult,
                                  result: !0,
                                  stream: e
                              }), r(e)
                          }, function(n) {
                              if ("NotFoundError" === n.name) {
                                  var s = {
                                      audio: !0
                                  };
                                  t.logger.info("[backup constraints]: " + JSON.stringify(a)), void 0 !== e && (e.settings.videoDirections.sendVideo = !1, s = t._composeConstraints(e)), navigator.mediaDevices.getUserMedia(s).then(function(e) {
                                      t.logger.info("Media access granted"), t._callStreams[o] = e, e.getTracks().forEach(function(e) {
                                          e.onended = t.onCallEnded, e.onmute = t.onCallEnded
                                      }), h.Client.getInstance().dispatchEvent({
                                          name: v.Events.MicAccessResult,
                                          result: !0,
                                          stream: e
                                      }), r(e)
                                  }, function(e) {
                                      t.logger.error("Media access denied: " + (e ? e.message || e.name || e : "unknown")), h.Client.getInstance().dispatchEvent({
                                          name: v.Events.MicAccessResult,
                                          result: !1,
                                          stream: null
                                      }), i(e)
                                  })
                              } else t.logger.error("Media access denied: " + (n ? n.message || n.name || n : "unknown")), h.Client.getInstance().dispatchEvent({
                                  name: v.Events.MicAccessResult,
                                  result: !1,
                                  stream: null
                              }), i(n)
                          });
                          else {
                              var s = null,
                                  c = null;
                              a.audio && (s = {
                                  audio: a.audio
                              }), a.video && (c = {
                                  video: a.video
                              }), navigator.mediaDevices.getUserMedia(s).then(function(e) {
                                  t.logger.info("Audio access granted"), c ? navigator.mediaDevices.getUserMedia(c).then(function(n) {
                                      t.logger.info("Video access granted");
                                      var i = new MediaStream;
                                      e.getTracks().forEach(function(e) {
                                          i.addTrack(e)
                                      }), n.getTracks().forEach(function(e) {
                                          i.addTrack(e)
                                      }), t._callStreams[o] = i, i.getTracks().forEach(function(e) {
                                          e.onended = t.onCallEnded, e.onmute = t.onCallEnded
                                      }), h.Client.getInstance().dispatchEvent({
                                          name: v.Events.MicAccessResult,
                                          result: !0,
                                          stream: i
                                      }), r(i)
                                  }, function(n) {
                                      t.logger.error("Video access denied: " + (n ? n.message || n.name || n : "unknown")), t._callStreams[o] = e, e.getTracks().forEach(function(e) {
                                          e.onended = t.onCallEnded, e.onmute = t.onCallEnded
                                      }), h.Client.getInstance().dispatchEvent({
                                          name: v.Events.MicAccessResult,
                                          result: !0,
                                          stream: e
                                      }), r(e)
                                  }) : (t._callStreams[o] = e, e.getTracks().forEach(function(e) {
                                      e.onended = t.onCallEnded, e.onmute = t.onCallEnded
                                  }), h.Client.getInstance().dispatchEvent({
                                      name: v.Events.MicAccessResult,
                                      result: !0,
                                      stream: e
                                  }), r(e))
                              }, function(e) {
                                  t.logger.error("Audio access denied: " + (e ? e.message || e.name || e : "unknown")), h.Client.getInstance().dispatchEvent({
                                      name: v.Events.MicAccessResult,
                                      result: !1,
                                      stream: null
                                  }), i(e)
                              })
                          }
                      }
                  })
              }
          }, {
              key: "_updateCallStream",
              value: function(e) {
                  return this.remCallStream(e), this.getCallStream(e)
              }
          }, {
              key: "updateCallStream",
              value: function(e) {
                  var t = this;
                  return this.logger.info("Updating call " + e.id() + " stream"), new Promise(function(n, r) {
                      var i = t._callStreams[e.id()];
                      t.getCallStream(e, !0).then(function(n) {
                          var r = i.getTracks(),
                              o = n.getTracks(),
                              a = r.map(function(e) {
                                  return e.kind
                              }).sort(),
                              s = o.map(function(e) {
                                  return e.kind
                              }).sort();
                          return r.length === o.length && a.every(function(e, t) {
                              return e === s[t]
                          }) ? e.peerConnection.updateCustomMedia(n) : (e.peerConnection.fastRemoveCustomMedia(i), t._remCallStream(i), e.peerConnection.addCustomMedia(n))
                      }).then(n).catch(r)
                  })
              }
          }, {
              key: "remCallStream",
              value: function(e) {
                  var t = void 0 === e ? "__default" : e.id();
                  this._callStreams[t] && (this._remCallStream(this._callStreams[t]), this._callStreams[t] = void 0, delete this._callStreams[t])
              }
          }, {
              key: "_remCallStream",
              value: function(e) {
                  e && (p.default.isIphone() || e.getTracks().forEach(function(t) {
                      t.onended = void 0, t.onmute = void 0, t.stop(), e.removeTrack(t)
                  }))
              }
          }, {
              key: "clear",
              value: function() {
                  this._mirrorStream && this._mirrorStream.getTracks().forEach(function(e) {
                      e.onended = void 0, e.onmute = void 0, e.stop()
                  }), this._mirrorStream = void 0;
                  for (var e in this._callStreams)
                      if (this._callStreams.hasOwnProperty(e)) {
                          var t = this._callStreams[e];
                          t && t.getTracks().forEach(function(e) {
                              e.onended = void 0, e.onmute = void 0, e.stop()
                          })
                      } this._callStreams = {}
              }
          }, {
              key: "getLocalMediaRenderers",
              value: function() {
                  return this._localMediaRenderers
              }
          }, {
              key: "showLocalVideo",
              value: function() {
                  var e = this,
                      t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                  if (this._mirrorMediaRendererId) throw new Error("Local video already displayed. Please, use Hardware.StreamManager.get().hideLocalVideo before request a new one.");
                  return new Promise(function(n, r) {
                      d.default.StreamManager.get().getMirrorStream().then(function(r) {
                          var i = new y.MediaRenderer(r, "video", t, !0, "voximplantlocalvideo");
                          e._localMediaRenderers.push(i), e._mirrorMediaRendererId = i.id, n(i), e.dispatchEvent({
                              name: d.default.HardwareEvents.MediaRendererAdded,
                              renderer: i
                          })
                      }).catch(r)
                  })
              }
          }, {
              key: "hideLocalVideo",
              value: function() {
                  var e = this;
                  if (this._mirrorMediaRendererId) return new Promise(function(t, n) {
                      var r = e._localMediaRenderers.filter(function(t) {
                          return t.id === e._mirrorMediaRendererId
                      });
                      r && r.forEach(function(e) {
                          e.clear()
                      }), e.remMirrorStream(), e._localMediaRenderers = e._localMediaRenderers.filter(function(t) {
                          return t.id !== e._mirrorMediaRendererId
                      }), e._mirrorMediaRendererId = void 0, t()
                  });
                  throw new Error("Local video not displayed yet. Please, use Hardware.StreamManager.get().showLocalVideo to request a new one.")
              }
          }, {
              key: "on",
              value: function(e, n, r) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "on", this).call(this, e, n)
              }
          }, {
              key: "off",
              value: function(e, n) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "off", this).call(this, e, n)
              }
          }, {
              key: "_newScreenSharing",
              value: function(e, t) {
                  var n = this;
                  return h.Client.getInstance().config().experiments && h.Client.getInstance().config().experiments.customScreenMedia ? new Promise(function(r, i) {
                      h.Client.getInstance().config().experiments.customScreenMedia({
                          call: e
                      }).then(function(i) {
                          var o = {
                              stream: i,
                              renderer: null
                          };
                          if (t) {
                              var a = new y.MediaRenderer(i, "sharing", !0, !0);
                              o.renderer = a, n.dispatchEvent({
                                  name: d.default.HardwareEvents.MediaRendererAdded,
                                  renderer: a
                              }), a.onBeforeDestroy = function() {
                                  o.renderer = null, n._sharingStreams[e.id()] = n._sharingStreams[e.id()].filter(function(e) {
                                      return e.stream.id !== i.id
                                  }), e.peerConnection.removeCustomMedia(o.stream).then(function() {
                                      o.stream = void 0
                                  })
                              }
                          } else i.getTracks().forEach(function(t) {
                              t.onended = function() {
                                  i.getTracks().some(function(e) {
                                      return "live" === e.readyState
                                  }) || (n._sharingStreams[e.id()] = n._sharingStreams[e.id()].filter(function(e) {
                                      return e.stream.id !== i.id
                                  }), e.peerConnection.removeCustomMedia(o.stream).then(function() {
                                      o.stream = void 0
                                  }))
                              }
                          });
                          void 0 === n._sharingStreams[e.id()] && (n._sharingStreams[e.id()] = []), n._sharingStreams[e.id()].push(o), r(o)
                      }).catch(function(e) {
                          i(e)
                      })
                  }) : new Promise(function(r, i) {
                      p.default.getScreenMedia().then(function(i) {
                          n.logger.info("Media access granted");
                          var o = {
                              stream: i,
                              renderer: null
                          };
                          if (t) {
                              var a = new y.MediaRenderer(i, "sharing", !0, !0);
                              o.renderer = a, n.dispatchEvent({
                                  name: d.default.HardwareEvents.MediaRendererAdded,
                                  renderer: a
                              }), a.onBeforeDestroy = function() {
                                  o.renderer = null, n._sharingStreams[e.id()] = n._sharingStreams[e.id()].filter(function(e) {
                                      return e.stream.id !== i.id
                                  }), e.peerConnection.removeCustomMedia(o.stream).then(function() {
                                      o.stream = void 0
                                  })
                              }
                          } else i.getTracks().forEach(function(t) {
                              t.onended = function() {
                                  i.getTracks().some(function(e) {
                                      return "live" === e.readyState
                                  }) || (n._sharingStreams[e.id()] = n._sharingStreams[e.id()].filter(function(e) {
                                      return e.stream.id !== i.id
                                  }), e.peerConnection.removeCustomMedia(o.stream).then(function() {
                                      o.stream = void 0
                                  }))
                              }
                          });
                          void 0 === n._sharingStreams[e.id()] && (n._sharingStreams[e.id()] = []), n._sharingStreams[e.id()].push(o), r(o)
                      }).catch(function(e) {
                          n.logger.error("Media access denied: " + (e ? e.message || e.name || e : "unknown")), i(e)
                      })
                  })
              }
          }, {
              key: "_getScreenSharing",
              value: function(e) {
                  return void 0 !== this._sharingStreams[e.id()] ? this._sharingStreams[e.id()] : []
              }
          }, {
              key: "_clearScreenSharing",
              value: function(e, t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      n._sharingStreams[e.id()] = n._sharingStreams[e.id()].filter(function(e) {
                          return e.stream.id !== t.stream.id
                      }), t.renderer && (n.dispatchEvent({
                          name: d.default.HardwareEvents.BeforeMediaRendererRemoved,
                          renderer: t.renderer
                      }), t.renderer.clear(), n.dispatchEvent({
                          name: d.default.HardwareEvents.MediaRendererRemoved,
                          renderer: t.renderer
                      }), t.renderer = void 0), t.stream.getTracks().forEach(function(e) {
                          e.stop()
                      }), r()
                  })
              }
          }, {
              key: "_getTracksKind",
              value: function(e) {
                  var t = {},
                      n = this._callStreams[e.id()];
                  void 0 !== n && n.getTracks().forEach(function(e) {
                      return t[e.id] = e.kind
                  });
                  var r = this._sharingStreams[e.id()];
                  return void 0 !== r && r.forEach(function(e) {
                      e.stream.getTracks().forEach(function(e) {
                          return t[e.id] = "sharing"
                      })
                  }), t
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "StreamManager"
              }
          }, {
              key: "onMirrorEnded",
              value: function() {
                  var e = this;
                  this.remMirrorStream(), this.getMirrorStream().then(function(t) {
                      e.dispatchEvent({
                          name: d.default.HardwareEvents.BeforeMediaRendererRemoved,
                          renderer: t
                      }), e.dispatchEvent({
                          name: d.default.HardwareEvents.MediaRendererRemoved,
                          renderer: null
                      })
                  })
              }
          }, {
              key: "onCallEnded",
              value: function() {}
          }, {
              key: "_composeConstraints",
              value: function(e) {
                  var t = void 0 === e ? "__default" : e.id(),
                      n = {};
                  return "__default" !== t && void 0 !== e && e.settings.videoDirections.sendVideo ? n.video = f.CameraManager.get().getCallConstraints(t) : n.video = !1, "__default" === t || e.settings.audioDirections.sendAudio ? n.audio = m.AudioDeviceManager.get().getCallConstraints(t) : n.audio = !1, n
              }
          }], [{
              key: "get",
              value: function() {
                  return void 0 === t.instance && (t.instance = new t), t.instance
              }
          }]), t
      }(g.EventTarget);
  l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "getMirrorStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "remMirrorStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "getCallStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_updateCallStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "updateCallStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "remCallStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_remCallStream", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "clear", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "getLocalMediaRenderers", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "showLocalVideo", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "hideLocalVideo", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "on", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "off", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_newScreenSharing", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_getScreenSharing", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_clearScreenSharing", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_getTracksKind", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "onMirrorEnded", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "onCallEnded", null), l([u.LogManager.d_trace(u.LogCategory.HARDWARE)], C.prototype, "_composeConstraints", null), t.StreamManager = C
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.InfoUpdated = "InfoUpdated"] = "InfoUpdated", e[e.Removed = "Removed"] = "Removed", e[e.RemoteMediaAdded = "RemoteMediaAdded"] = "RemoteMediaAdded", e[e.RemoteMediaRemoved = "RemoteMediaRemoved"] = "RemoteMediaRemoved", e[e.RTCStatsReceived = "RTCStatsReceived"] = "RTCStatsReceived"
  }(t.EndpointEvents || (t.EndpointEvents = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : e[t] = n, e
  }

  function i(e) {
      if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
      }
      return Array.from(e)
  }

  function o(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      c = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var l = n(0),
      u = n(12),
      d = n(1),
      g = n(5),
      f = n(4),
      p = n(58),
      v = n(59),
      h = function() {
          function e() {
              o(this, e), this._calls = new WeakMap, this.preferredVideoCodec = "", this.preferredVideoCodec = d.Client.getInstance().config().H264first ? "video/H264" : d.Client.getInstance().config().VP8first ? "video/VP8" : ""
          }
          return a(e, [{
              key: "addCall",
              value: function(e) {
                  e && "object" === (void 0 === e ? "undefined" : s(e)) && this._calls.set(e, {
                      codecMismatch: {
                          audioLevel: v.Statistic.QualityIssueLevel.None,
                          videoLevel: v.Statistic.QualityIssueLevel.None,
                          sharingLevel: v.Statistic.QualityIssueLevel.None,
                          audioChecks: 0,
                          videoChecks: 0,
                          sharingChecks: 0
                      },
                      highMediaLatency: {
                          levels: [],
                          latencies: [],
                          lastJitterBuffers: {},
                          prevLevel: v.Statistic.QualityIssueLevel.None
                      },
                      ICEDisconnected: {
                          level: v.Statistic.QualityIssueLevel.None
                      },
                      localVideoDegradation: {
                          videoLevel: v.Statistic.QualityIssueLevel.None,
                          sharingLevel: v.Statistic.QualityIssueLevel.None
                      },
                      noAudioSignal: {
                          level: v.Statistic.QualityIssueLevel.None
                      },
                      packetLoss: {
                          level: v.Statistic.QualityIssueLevel.None,
                          lastLost: 0,
                          lastTotal: 0,
                          checks: 0
                      }
                  })
              }
          }, {
              key: "deleteCall",
              value: function(e) {
                  e && "object" === (void 0 === e ? "undefined" : s(e)) && this._calls.has(e) && this._calls.delete(e)
              }
          }, {
              key: "analyzeCallStats",
              value: function(e, t) {
                  if (e && "object" === (void 0 === e ? "undefined" : s(e)) && this._calls.has(e)) {
                      var n = this._calls.get(e),
                          r = f.default.StreamManager.get()._getTracksKind(e);
                      e.state() === u.CallState.ALERTING || e.state() === u.CallState.PROGRESSING || e.state() === u.CallState.ENDED || (n.codecMismatch = this.checkCodecMismatch(e, t, r, n.codecMismatch), n.highMediaLatency = this.checkMediaLatency(e, t, r, n.highMediaLatency), n.localVideoDegradation = this.checkLocalVideoDegradation(e, t, r, n.localVideoDegradation), n.packetLoss = this.checkPacketLoss(e, t, n.packetLoss)), this._calls.set(e, n)
                  }
              }
          }, {
              key: "checkICEConnection",
              value: function(e, t) {
                  if (e && "object" === (void 0 === e ? "undefined" : s(e)) && this._calls.has(e)) {
                      var n = this._calls.get(e);
                      "failed" === t && n.ICEDisconnected.level !== v.Statistic.QualityIssueLevel.Critical ? (e.dispatchEvent({
                          call: e,
                          name: g.CallEvents.QualityIssueICEDisconnected,
                          level: v.Statistic.QualityIssueLevel.Critical
                      }), n.ICEDisconnected.level = v.Statistic.QualityIssueLevel.Critical, this._calls.set(e, n)) : "failed" !== t && n.ICEDisconnected.level === v.Statistic.QualityIssueLevel.Critical && (e.dispatchEvent({
                          call: e,
                          name: g.CallEvents.QualityIssueICEDisconnected,
                          level: v.Statistic.QualityIssueLevel.None
                      }), n.ICEDisconnected.level = v.Statistic.QualityIssueLevel.None, this._calls.set(e, n))
                  }
              }
          }, {
              key: "checkCodecMismatch",
              value: function(t, n, r, i) {
                  var o = n.filter(function(e) {
                      return "codec" === e.type
                  });
                  if (o.length) {
                      var a = Object.keys(r).find(function(e) {
                              return r[e] === p.TrackType.video
                          }),
                          s = Object.keys(r).find(function(e) {
                              return r[e] === p.TrackType.audio
                          }),
                          c = Object.keys(r).find(function(e) {
                              return r[e] === p.TrackType.sharing
                          }),
                          l = n.filter(function(e) {
                              return "track" === e.type
                          }),
                          u = n.filter(function(e) {
                              return "outbound-rtp" === e.type
                          }),
                          d = (l.find(function(e) {
                              return e.trackIdentifier === a
                          }) || {
                              id: void 0
                          }).id,
                          f = (l.find(function(e) {
                              return e.trackIdentifier === s
                          }) || {
                              id: void 0
                          }).id,
                          h = (l.find(function(e) {
                              return e.trackIdentifier === c
                          }) || {
                              id: void 0
                          }).id,
                          m = u.find(function(e) {
                              return e.trackId === d
                          }),
                          y = u.find(function(e) {
                              return e.trackId === f
                          }),
                          C = u.find(function(e) {
                              return e.trackId === h
                          }),
                          S = m && m.codecId ? m.codecId : void 0,
                          _ = y && y.codecId ? y.codecId : void 0,
                          E = C && C.codecId ? C.codecId : void 0,
                          L = (o.find(function(e) {
                              return e.id === S
                          }) || {
                              mimeType: void 0
                          }).mimeType,
                          M = (o.find(function(e) {
                              return e.id === _
                          }), (o.find(function(e) {
                              return e.id === E
                          }) || {
                              mimeType: void 0
                          }).mimeType),
                          b = t.settings.H264first ? "video/H264" : t.settings.VP8first ? "video/VP8" : this.preferredVideoCodec,
                          R = void 0 === L,
                          T = void 0 === L;
                      m && m.bytesSent && (R ? i.videoLevel === v.Statistic.QualityIssueLevel.Critical && i.videoChecks > e.MAX_STATS_CHECKS ? (t.dispatchEvent({
                          call: t,
                          name: g.CallEvents.QualityIssueCodecMismatch,
                          level: v.Statistic.QualityIssueLevel.Critical,
                          kind: p.TrackType.video,
                          sendCodec: L
                      }), i.videoLevel = v.Statistic.QualityIssueLevel.Critical, i.videoChecks = 0) : (i.videoLevel = v.Statistic.QualityIssueLevel.Critical, i.videoChecks = i.videoChecks + 1) : b && b !== L && (t.dispatchEvent({
                          call: t,
                          name: g.CallEvents.QualityIssueCodecMismatch,
                          level: v.Statistic.QualityIssueLevel.Major,
                          kind: p.TrackType.video,
                          sendCodec: L
                      }), i.videoLevel = v.Statistic.QualityIssueLevel.Major, i.videoChecks = 0)), C && C.bytesSent && (T ? i.sharingLevel === v.Statistic.QualityIssueLevel.Critical && i.sharingChecks > e.MAX_STATS_CHECKS ? (t.dispatchEvent({
                          call: t,
                          name: g.CallEvents.QualityIssueCodecMismatch,
                          level: v.Statistic.QualityIssueLevel.Critical,
                          kind: p.TrackType.sharing,
                          sendCodec: M
                      }), i.sharingLevel = v.Statistic.QualityIssueLevel.Critical, i.sharingChecks = 0) : (i.sharingLevel = v.Statistic.QualityIssueLevel.Critical, i.sharingChecks = i.videoChecks + 1) : b && b !== M && (t.dispatchEvent({
                          call: t,
                          name: g.CallEvents.QualityIssueCodecMismatch,
                          level: v.Statistic.QualityIssueLevel.Major,
                          kind: p.TrackType.sharing,
                          sendCodec: M
                      }), i.sharingLevel = v.Statistic.QualityIssueLevel.Major, i.sharingChecks = 0))
                  }
                  return i
              }
          }, {
              key: "checkMediaLatency",
              value: function(e, t, n, o) {
                  var a = t.find(function(e) {
                          return "candidate-pair" === e.type && (e.selected || e.nominated && "succeeded" === e.state)
                      }),
                      s = t.filter(function(e) {
                          return "inbound-rtp" === e.type
                      }),
                      c = t.filter(function(e) {
                          return "track" === e.type && s.some(function(t) {
                              return t.trackId === e.id
                          })
                      }),
                      l = c.reduce(function(e, t) {
                          var n = void 0 !== t.jitterBufferDelay ? t.jitterBufferDelay - (o.lastJitterBuffers[t.id] || {
                                  delay: 0
                              }).delay : void 0,
                              r = void 0 !== t.jitterBufferEmittedCount ? t.jitterBufferEmittedCount - (o.lastJitterBuffers[t.id] || {
                                  emittedCount: 0
                              }).emittedCount : void 0,
                              i = void 0 !== n && r ? 1e3 * n / r : 0;
                          return i > e ? i : e
                      }, 0),
                      u = 1e3 * (a && a.currentRoundTripTime || 0),
                      d = Math.round(u / 2 + l);
                  if (o.latencies.push(d), d > 300 ? o.levels.push(v.Statistic.QualityIssueLevel.Critical) : d > 200 ? o.levels.push(v.Statistic.QualityIssueLevel.Major) : d > 100 ? o.levels.push(v.Statistic.QualityIssueLevel.Minor) : o.levels.push(v.Statistic.QualityIssueLevel.None), 5 === o.levels.length) {
                      var f = [v.Statistic.QualityIssueLevel.Critical, v.Statistic.QualityIssueLevel.Major, v.Statistic.QualityIssueLevel.Minor, v.Statistic.QualityIssueLevel.None],
                          p = o.levels.reduce(function(e, t) {
                              return e[f.indexOf(t)]++, e
                          }, [0, 0, 0, 0]);
                      if (p.includes(5)) {
                          var h = f[p.indexOf(5)];
                          h === v.Statistic.QualityIssueLevel.None && o.prevLevel === v.Statistic.QualityIssueLevel.None || e.dispatchEvent({
                              call: e,
                              name: g.CallEvents.QualityIssueHighMediaLatency,
                              level: h,
                              latency: d
                          }), o.prevLevel = h
                      } else {
                          var m = p.reduce(function(e, t, n) {
                                  return 2 !== e.length && t && e.push(n), e
                              }, []),
                              y = Math.log1p(p[m[0]]) - Math.log1p(p[m[1]]),
                              C = f[y > .5 ? m[0] : m[1]],
                              S = o.levels.map(function(e, t) {
                                  return e === C ? o.latencies[t] : 0
                              });
                          C === v.Statistic.QualityIssueLevel.None && o.prevLevel === v.Statistic.QualityIssueLevel.None || e.dispatchEvent({
                              call: e,
                              name: g.CallEvents.QualityIssueHighMediaLatency,
                              level: C,
                              latency: Math.max.apply(Math, i(S))
                          }), o.prevLevel = C
                      }
                      o.levels = [], o.latencies = []
                  }
                  return o.lastJitterBuffers = c.reduce(function(e, t) {
                      return Object.assign(e, r({}, t.id, {
                          delay: t.jitterBufferDelay,
                          emittedCount: t.jitterBufferEmittedCount
                      }))
                  }, {}), o
              }
          }, {
              key: "checkLocalVideoDegradation",
              value: function(e, t, n, r) {
                  var i = n ? Object.keys(n).find(function(e) {
                          return n[e] === p.TrackType.video
                      }) : void 0,
                      o = n ? Object.keys(n).find(function(e) {
                          return n[e] === p.TrackType.sharing
                      }) : void 0;
                  if (i) {
                      var a = t.filter(function(e) {
                          return "track" === e.type
                      }).find(function(e) {
                          return e.trackIdentifier === i
                      });
                      if (a && a.frameHeight && a.frameWidth) {
                          var s = f.default.CameraManager.get().getCallVideoSettings(e),
                              c = Math.min(a.frameWidth, a.frameHeight) / Math.min(s.frameWidth || 320, s.frameHeight || 240),
                              l = v.Statistic.QualityIssueLevel.None;
                          l = c < .5 ? v.Statistic.QualityIssueLevel.Critical : c <= .7 ? v.Statistic.QualityIssueLevel.Major : c <= .85 ? v.Statistic.QualityIssueLevel.Minor : v.Statistic.QualityIssueLevel.None, r.videoLevel !== l && (e.dispatchEvent({
                              call: e,
                              name: g.CallEvents.QualityIssueLocalVideoDegradation,
                              level: l,
                              kind: p.TrackType.video,
                              targetWidth: s.frameWidth || 320,
                              targetHeight: s.frameHeight || 240,
                              actualWidth: a.frameWidth,
                              actualHeight: a.frameHeight
                          }), r.videoLevel = l)
                      }
                  }
                  if (o) {
                      var u = t.filter(function(e) {
                          return "track" === e.type
                      }).find(function(e) {
                          return e.trackIdentifier === o
                      });
                      if (u && void 0 !== u.framesPerSecond) {
                          var d = v.Statistic.QualityIssueLevel.None;
                          d = u.framesPerSecond < 4 ? v.Statistic.QualityIssueLevel.Critical : u.framesPerSecond < 8 ? v.Statistic.QualityIssueLevel.Major : u.framesPerSecond < 15 ? v.Statistic.QualityIssueLevel.Minor : v.Statistic.QualityIssueLevel.None, r.sharingLevel !== d && (e.dispatchEvent({
                              call: e,
                              name: g.CallEvents.QualityIssueLocalVideoDegradation,
                              level: d,
                              kind: p.TrackType.sharing,
                              fps: u.framesPerSecond
                          }), r.sharingLevel = d)
                      }
                  }
                  return r
              }
          }, {
              key: "checkAudioSignal",
              value: function(e, t, n, r) {
                  var i = n ? Object.keys(n).find(function(e) {
                      return n[e] === p.TrackType.audio
                  }) : void 0;
                  if (i) {
                      var o = t.filter(function(e) {
                          return "track" === e.type
                      }).find(function(e) {
                          return e.trackIdentifier === i
                      });
                      o && void 0 !== o.audioLevel && o.audioLevel > 0 && r.level === v.Statistic.QualityIssueLevel.Critical && (e.dispatchEvent({
                          call: e,
                          name: g.CallEvents.QualityIssueNoAudioSignal,
                          level: v.Statistic.QualityIssueLevel.None
                      }), r.level = v.Statistic.QualityIssueLevel.None), o && void 0 !== o.audioLevel && 0 === o.audioLevel && (e.dispatchEvent({
                          call: e,
                          name: g.CallEvents.QualityIssueNoAudioSignal,
                          level: v.Statistic.QualityIssueLevel.Critical
                      }), r.level = v.Statistic.QualityIssueLevel.Critical)
                  }
                  return r
              }
          }, {
              key: "checkPacketLoss",
              value: function(e, t, n) {
                  var r = t.filter(function(e) {
                      return "inbound-rtp" === e.type
                  });
                  if (n.checks = n.checks + 1, 5 === n.checks) {
                      var i = r.length ? r.reduce(function(e, t) {
                              return {
                                  lost: e.lost + (t.packetsLost || 0),
                                  total: e.total + (t.packetsLost || 0) + (t.packetsReceived || 0)
                              }
                          }, {
                              lost: 0,
                              total: 0
                          }) : {
                              lost: 0,
                              total: 0
                          },
                          o = i.total - n.lastTotal ? (i.lost - n.lastLost) / (i.total - n.lastTotal) : 0,
                          a = v.Statistic.QualityIssueLevel.None;
                      a = o >= .15 ? v.Statistic.QualityIssueLevel.Critical : o >= .1 ? v.Statistic.QualityIssueLevel.Major : o >= .05 ? v.Statistic.QualityIssueLevel.Minor : v.Statistic.QualityIssueLevel.None, n.level !== a && (e.dispatchEvent({
                          call: e,
                          name: g.CallEvents.QualityIssuePacketLoss,
                          level: a,
                          packetLoss: o
                      }), n.level = a), n.lastLost = i.lost, n.lastTotal = i.total, n.checks = 0
                  }
                  return n
              }
          }, {
              key: "checkLowBandwidth",
              value: function() {}
          }], [{
              key: "get",
              value: function() {
                  return void 0 === this.inst && (this.inst = new e), this.inst
              }
          }]), e
      }();
  h.MAX_STATS_CHECKS = 4, c([l.LogManager.d_trace(l.LogCategory.RTC)], h.prototype, "addCall", null), c([l.LogManager.d_trace(l.LogCategory.RTC)], h.prototype, "deleteCall", null), t.CallStatsAnalyzer = h
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(5),
      c = n(0),
      l = function() {
          function e(t, n) {
              var i = this;
              r(this, e), this._pcStatus = n, this._q = [], t.on(s.CallEvents.Updated, function(t) {
                  if (c.LogManager.get().writeMessage(c.LogCategory.REINVITEQ, "CallEvent", c.LogLevel.TRACE, "Updated with result " + t.result), e._currentReinvite) {
                      var n = e._currentReinvite;
                      t.result ? n.resolve(t) : n.reject(t), e._currentReinvite = void 0
                  }
                  i.runNext()
              }), t.on(s.CallEvents.PendingUpdate, function(t) {
                  c.LogManager.get().writeMessage(c.LogCategory.REINVITEQ, "CallEvent", c.LogLevel.TRACE, "IncomingUpdate. Local RI==" + o(e._currentReinvite)), e._currentReinvite && (e._currentReinvite.reject(), e._currentReinvite = void 0)
              }), t.on(s.CallEvents.UpdateFailed, function(t) {
                  c.LogManager.get().writeMessage(c.LogCategory.REINVITEQ, "CallEvent", c.LogLevel.TRACE, "UpdateFailed"), e._currentReinvite && (e._currentReinvite.reject(), e._currentReinvite = void 0)
              })
          }
          return i(e, [{
              key: "runNext",
              value: function() {
                  void 0 === e._currentReinvite && this._q.length > 0 && this._pcStatus() && (e._currentReinvite = this._q.splice(0, 1)[0], e._currentReinvite.fx())
              }
          }, {
              key: "add",
              value: function(e) {
                  this._q.push(e), this.runNext()
              }
          }, {
              key: "clear",
              value: function() {
                  this._q.forEach(function(e) {
                      e.reject()
                  })
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "ReInviteQ"
              }
          }]), e
      }();
  a([c.LogManager.d_trace(c.LogCategory.REINVITEQ)], l.prototype, "runNext", null), a([c.LogManager.d_trace(c.LogCategory.REINVITEQ)], l.prototype, "add", null), a([c.LogManager.d_trace(c.LogCategory.REINVITEQ)], l.prototype, "clear", null), t.ReInviteQ = l
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = function() {
      function e(t) {
          r(this, e), this.str = t || e.getNewGUIDString()
      }
      return i(e, [{
          key: "toString",
          value: function() {
              return this.str
          }
      }, {
          key: "_traceName",
          value: function() {
              return "GUID"
          }
      }], [{
          key: "getNewGUIDString",
          value: function() {
              var e = (new Date).getTime();
              return window.performance && "function" == typeof window.performance.now && (e += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                  var n = (e + 16 * Math.random()) % 16 | 0;
                  return e = Math.floor(e / 16), ("x" == t ? n : 3 & n | 8).toString(16)
              })
          }
      }]), e
  }();
  t.default = o
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(25),
      l = n(44),
      u = n(26),
      d = n(18),
      g = n(27),
      f = n(41),
      p = n(19),
      v = function() {
          function e(t) {
              r(this, e), this._backup = {}, this._uuid = t.uuid, this._participants = t.participants, this._title = t.title, this._direct = t.direct, this._publicJoin = t.publicJoin, this._uberConversation = t.uberConversation, this._customData = t.customData, this._createdAt = t.createdAt, this._lastUpdate = t.lastUpdate, this._lastSeq = Number(t.lastSeq)
          }
          return i(e, [{
              key: "updateSeq",
              value: function(e) {
                  "number" == typeof e && e > this._lastSeq && (this._lastSeq = e), this._lastUpdate = Date.now() / 1e3 | 0
              }
          }, {
              key: "toCache",
              value: function() {
                  return {
                      uuid: this._uuid,
                      title: this._title,
                      participants: this._participants,
                      direct: this._direct,
                      publicJoin: this._publicJoin,
                      uberConversation: this._uberConversation,
                      createdAt: this._createdAt,
                      lastUpdate: this._lastUpdate,
                      customData: this._customData,
                      lastSeq: this._lastSeq
                  }
              }
          }, {
              key: "_getCreatePayload",
              value: function() {
                  return {
                      participants: this._prepareParticipants(this._participants).map(function(e) {
                          return Object.assign(e, {
                              flags: e.flags ? e.flags : 7
                          })
                      }),
                      title: "string" == typeof this._title ? this._title : "",
                      direct: "boolean" == typeof this._direct && this._direct,
                      enable_public_join: "boolean" == typeof this._publicJoin && this._publicJoin,
                      uber_conversation: "boolean" == typeof this._uberConversation ? this._uberConversation : void 0,
                      custom_data: "object" == o(this._customData) ? this._customData : {}
                  }
              }
          }, {
              key: "_getEditPayload",
              value: function() {
                  if (void 0 === this._uuid) throw Error("You must get conversation UUID with MessengetAction.getConversation() action!");
                  return {
                      uuid: this._uuid,
                      title: "string" == typeof this._title ? this._title : "",
                      enable_public_join: "boolean" == typeof this._publicJoin && this._publicJoin,
                      custom_data: "object" == o(this._customData) ? this._customData : {}
                  }
              }
          }, {
              key: "_getUserPermissions",
              value: function(e) {
                  var t = (e.isOwner ? "1000000000" : "") + [e.canRemoveAll, e.canEditAll, e.canManageParticipants, e.canRemove, e.canEdit, e.canWrite].map(function(e) {
                      return e ? 1 : 0
                  }).join("");
                  return parseInt(t, 2)
              }
          }, {
              key: "_prepareParticipants",
              value: function(e) {
                  var t = this;
                  return e.map(function(e) {
                      return {
                          user_id: e.userId,
                          flags: t._getUserPermissions(e),
                          last_read: e.lastRead
                      }
                  })
              }
          }, {
              key: "_revertChanges",
              value: function() {
                  var e = this;
                  Object.keys(this._backup).forEach(function(t) {
                      e[t] = e._backup[t]
                  }), this._backup = {}
              }
          }, {
              key: "update",
              value: function() {
                  return l.default.get().editConversation(this)
              }
          }, {
              key: "setTitle",
              value: function(e) {
                  return "string" != typeof e ? c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.editConversation) : (this._backup.title = this._title, this._title = e, l.default.get().editConversation(this))
              }
          }, {
              key: "setPublicJoin",
              value: function(e) {
                  return "boolean" != typeof e ? c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.editConversation) : (this._backup.publicJoin = this._publicJoin, this._publicJoin = e, l.default.get().editConversation(this))
              }
          }, {
              key: "setCustomData",
              value: function(e) {
                  return !e || Array.isArray(e) || "object" != (void 0 === e ? "undefined" : o(e)) ? c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.editConversation) : (this._backup.customData = this._customData, this._customData = e, l.default.get().editConversation(this))
              }
          }, {
              key: "addParticipants",
              value: function(e) {
                  var t = this;
                  return Array.isArray(e) && 0 != e.length ? new Promise(function(n, r) {
                      var i = d.MsgSignaling.get().sendWsMessage(g.MsgAction.addParticipants, {
                          uuid: t._uuid,
                          participants: t._prepareParticipants(e)
                      });
                      c.Messenger.getInstance()._registerPromise(i, n, r)
                  }) : c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.addParticipants)
              }
          }, {
              key: "editParticipants",
              value: function(e) {
                  var t = this;
                  return Array.isArray(e) && 0 != e.length ? new Promise(function(n, r) {
                      var i = d.MsgSignaling.get().sendWsMessage(g.MsgAction.editParticipants, {
                          uuid: t._uuid,
                          participants: t._prepareParticipants(e)
                      });
                      c.Messenger.getInstance()._registerPromise(i, n, r)
                  }) : c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.editParticipants)
              }
          }, {
              key: "removeParticipants",
              value: function(e) {
                  var t = this;
                  return Array.isArray(e) && 0 != e.length ? new Promise(function(n, r) {
                      var i = d.MsgSignaling.get().sendWsMessage(g.MsgAction.removeParticipants, {
                          uuid: t._uuid,
                          participants: e.filter(function(e) {
                              return void 0 !== e.userId
                          }).map(function(e) {
                              return e.userId
                          })
                      });
                      c.Messenger.getInstance()._registerPromise(i, n, r)
                  }) : c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.removeParticipants)
              }
          }, {
              key: "sendMessage",
              value: function(e, t) {
                  return "string" == typeof e && void 0 !== t && Array.isArray(t) && t.every(function(e) {
                      return e && "object" === (void 0 === e ? "undefined" : o(e))
                  }) ? new u.Message(e, t).sendTo(this) : c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.sendMessage)
              }
          }, {
              key: "typing",
              value: function() {
                  var e = this;
                  return this._debounceLock ? Promise.resolve(!1) : (setTimeout(function() {
                      e._debounceLock = !1
                  }, 1e4), this._debounceLock = !0, new Promise(function(t, n) {
                      var r = d.MsgSignaling.get().sendWsMessage(g.MsgAction.typingMessage, {
                          conversation: e._uuid
                      });
                      c.Messenger.getInstance()._registerPromise(r, t, n)
                  }))
              }
          }, {
              key: "markAsRead",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      var i = d.MsgSignaling.get().sendWsMessage(g.MsgAction.isRead, {
                          conversation: t._uuid,
                          seq: e
                      });
                      c.Messenger.getInstance()._registerPromise(i, n, r)
                  })
              }
          }, {
              key: "retransmitEvents",
              value: function(e, t, n) {
                  var r = this;
                  return "number" != typeof t || "number" != typeof e ? c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.retransmitEvents) : new Promise(function(i, o) {
                      var a = void 0,
                          s = void 0,
                          l = void 0;
                      Promise.all(Array(t - e + 1).fill(0).map(function(t, n) {
                          return n + e
                      }).map(function(e) {
                          return new Promise(function(t, n) {
                              var r = function n(r) {
                                      r.events && r.events[0] && Number(r.events[0].seq) === e && (clearTimeout(o), c.Messenger.getInstance().off(p.default.MessengerEvents.RetransmitEvents, n), c.Messenger.getInstance().off(p.default.MessengerEvents.Error, i), s || (s = r.initiator), l || (l = r.messengerAction), t(r.events[0]))
                                  },
                                  i = function t(i) {
                                      i.messengerAction == p.default.MessengerAction.retransmitEvents && i.events && i.events[0] && Number(i.events[0].seq) === e && (clearTimeout(o), c.Messenger.getInstance().off(p.default.MessengerEvents.RetransmitEvents, r), c.Messenger.getInstance().off(p.default.MessengerEvents.Error, t), n(i))
                                  },
                                  o = setTimeout(function() {
                                      c.Messenger.getInstance().off(p.default.MessengerEvents.RetransmitEvents, r), c.Messenger.getInstance().off(p.default.MessengerEvents.Error, i), c.Messenger.getInstance().reject(p.default.MessengerError.Error_0, p.default.MessengerAction.retransmitEvents).catch(n)
                                  }, c.Messenger.rejectTimeout);
                              c.Messenger.getInstance().on(p.default.MessengerEvents.RetransmitEvents, r), c.Messenger.getInstance().on(p.default.MessengerEvents.Error, i)
                          })
                      })).then(function(e) {
                          return i({
                              initiator: s,
                              messengerAction: l,
                              events: e,
                              requestUuid: a
                          })
                      }).catch(o), a = d.MsgSignaling.get().sendWsMessage(g.MsgAction.retransmitEvents, {
                          conversation: r._uuid,
                          events_from: 0 | e,
                          events_to: 0 | t,
                          count: n
                      })
                  })
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "Conversation"
              }
          }, {
              key: "uuid",
              get: function() {
                  return this._uuid
              }
          }, {
              key: "title",
              get: function() {
                  return this._title
              },
              set: function(e) {
                  this._backup.title = this._title, this._title = e
              }
          }, {
              key: "createdAt",
              get: function() {
                  return this._createdAt
              }
          }, {
              key: "lastUpdate",
              get: function() {
                  return this._lastUpdate
              }
          }, {
              key: "direct",
              get: function() {
                  return this._direct
              }
          }, {
              key: "uberConversation",
              get: function() {
                  return this._uberConversation
              }
          }, {
              key: "publicJoin",
              get: function() {
                  return this._publicJoin
              },
              set: function(e) {
                  this._backup.publicJoin = this._publicJoin, this._publicJoin = e
              }
          }, {
              key: "participants",
              get: function() {
                  return this._participants
              }
          }, {
              key: "customData",
              get: function() {
                  return this._customData
              },
              set: function(e) {
                  this._backup.customData = this._customData, this._customData = e
              }
          }, {
              key: "lastSeq",
              get: function() {
                  return this._lastSeq
              }
          }], [{
              key: "_createFromBus",
              value: function(t, n) {
                  return new e({
                      participants: t.participants && Array.isArray(t.participants) ? t.participants.map(function(e) {
                          var t = Number(e.flags) === f.MsgPermissions.all,
                              n = Number(e.flags) > f.MsgPermissions.is_owner && e.flags < f.MsgPermissions.all,
                              r = Number(e.flags).toString(2).slice(-6).split("").reverse();
                          return {
                              userId: Number(e.user_id),
                              lastRead: e.last_read,
                              isOwner: t || n,
                              canWrite: t || "1" === r[0],
                              canEdit: t || "1" === r[1],
                              canRemove: t || "1" === r[2],
                              canManageParticipants: t || "1" === r[3],
                              canEditAll: t || "1" === r[4],
                              canRemoveAll: t || "1" === r[5]
                          }
                      }) : [],
                      title: t.title,
                      uuid: t.uuid,
                      direct: t.direct,
                      publicJoin: t.enable_public_join,
                      uberConversation: t.uber_conversation,
                      createdAt: t.created_at,
                      lastUpdate: t.last_update,
                      lastSeq: n,
                      customData: t.custom_data && "object" === o(t.custom_data) ? t.custom_data : void 0
                  })
              }
          }, {
              key: "createFromCache",
              value: function(t) {
                  return new e({
                      uuid: t.uuid,
                      title: t.title,
                      participants: t.participants || [],
                      direct: t.direct,
                      publicJoin: t.publicJoin,
                      uberConversation: t.uberConversation,
                      createdAt: t.createdAt,
                      lastUpdate: t.lastUpdate,
                      customData: t.customData
                  })
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "updateSeq", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "toCache", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "_getCreatePayload", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "_getEditPayload", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "_prepareParticipants", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "_revertChanges", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "update", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "addParticipants", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "editParticipants", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "removeParticipants", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "typing", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "markAsRead", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v.prototype, "retransmitEvents", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v, "_createFromBus", null), a([s.LogManager.d_trace(s.LogCategory.MESSAGING)], v, "createFromCache", null), t.Conversation = v
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(29),
      l = function() {
          function e() {
              if (r(this, e), void 0 !== e.instance) throw new Error("Error - use StreamManager.get()");
              navigator && navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints ? this._supportedConstraints = navigator.mediaDevices.getSupportedConstraints() : this._supportedConstraints = {}, this.__defaultParams = {}, this._lastAudioInputDevices = [], this._lastAudioOutputDevices = [], this._callParams = {}, this.logger = s.LogManager.get().createLogger(s.LogCategory.USERMEDIA, this._traceName())
          }
          return i(e, [{
              key: "getAudioContext",
              value: function() {
                  if (this.audioContext) return this.audioContext;
                  if (void 0 !== window.AudioContext || void 0 !== window.webkitAudioContext) {
                      window.AudioContext = window.AudioContext || window.webkitAudioContext;
                      try {
                          return this.audioContext = new AudioContext, this.audioContext
                      } catch (e) {
                          return this.audioContext = null, null
                      }
                  }
              }
          }, {
              key: "prepareAudioContext",
              value: function() {
                  this.getAudioContext()
              }
          }, {
              key: "getInputDevices",
              value: function() {
                  var e = this;
                  return navigator.mediaDevices.enumerateDevices().then(function(t) {
                      return e.logger.info("Got input devices: " + JSON.stringify(t)), e._lastAudioInputDevices = t.map(function(e) {
                          if ("audio" === e.kind || "audioinput" === e.kind) return {
                              id: e.deviceId,
                              name: e.label,
                              group: e.groupId
                          }
                      }).filter(function(e) {
                          return void 0 !== e
                      }), e._lastAudioInputDevices
                  })
              }
          }, {
              key: "getOutputDevices",
              value: function() {
                  var e = this;
                  return navigator.mediaDevices.enumerateDevices().then(function(t) {
                      return e.logger.info("Got output devices: " + JSON.stringify(t)), e._lastAudioOutputDevices = t.map(function(e) {
                          if ("audiooutput" === e.kind) return {
                              id: e.deviceId,
                              name: e.label,
                              group: e.groupId
                          }
                      }).filter(function(e) {
                          return void 0 !== e
                      }), e._lastAudioOutputDevices
                  })
              }
          }, {
              key: "getDefaultAudioSettings",
              value: function() {
                  return this.__defaultParams
              }
          }, {
              key: "setDefaultAudioSettings",
              value: function(e) {
                  this.logger.info("Set default audio settings: " + JSON.stringify(e)), this.__defaultParams = e
              }
          }, {
              key: "setCallAudioSettings",
              value: function(e, t) {
                  var n = this;
                  return this.logger.info("Setting call " + e.id + " audio settings: " + JSON.stringify(t)), new Promise(function(r, i) {
                      n._callParams[e.id()] === t && r();
                      var o = n._callParams[e.id()].outputId !== t.outputId,
                          a = n._callParams[e.id()].inputId !== t.inputId || n._callParams[e.id()].noiseSuppression !== t.noiseSuppression || n._callParams[e.id()].echoCancellation !== t.echoCancellation || n._callParams[e.id()].disableAudio !== t.disableAudio;
                      n.logger.info("Must update renderers: " + o + ", must update source: " + a), n._callParams[e.id()] = t, o && e.getEndpoints().forEach(function(e) {
                          e.mediaRenderers.forEach(function(e) {
                              return e.useAudioOutput(t.outputId)
                          })
                      }), a ? c.StreamManager.get().updateCallStream(e).then(function() {
                          r()
                      }).catch(function(t) {
                          n.logger.warning("Failed to update call " + e.id() + " stream: " + t), i(t)
                      }) : r()
                  })
              }
          }, {
              key: "getCallAudioSettings",
              value: function(e) {
                  return this._callParams[e.id()]
              }
          }, {
              key: "getCallConstraints",
              value: function(e) {
                  return this._callParams[e] ? this._getAudioConstraints(this._callParams[e]) : (this._callParams[e] = this.__defaultParams, this._getAudioConstraints(this.__defaultParams))
              }
          }, {
              key: "_getAudioConstraints",
              value: function(e) {
                  if (e.disableAudio) return !1;
                  var t = "ideal";
                  e.strict && (t = "exact");
                  var n = {};
                  return e.inputId && (this._lastAudioInputDevices && this._lastAudioInputDevices.some(function(t) {
                      return t.id === e.inputId
                  }) ? (n.deviceId = {}, n.deviceId[t] = e.inputId) : this.logger.warning("There is no audio input device with id " + e.inputId)), e.echoCancellation && this._supportedConstraints.echoCancellation && (n.echoCancellation = e.echoCancellation), e.noiseSuppression && this._supportedConstraints.noiseSuppression && (n.noiseSuppression = e.echoCancellation), e.autoGainControl && this._supportedConstraints.autoGainControl && (n.autoGainControl = e.autoGainControl), !Object.keys(n) || n
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "AudioDeviceManager"
              }
          }], [{
              key: "get",
              value: function() {
                  return void 0 === e.instance && (e.instance = new e), e.instance
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "getInputDevices", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "getOutputDevices", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "getDefaultAudioSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "setDefaultAudioSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "setCallAudioSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "getCallAudioSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "getCallConstraints", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], l.prototype, "_getAudioConstraints", null), t.AudioDeviceManager = l
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(29),
      l = n(4),
      u = function() {
          function e() {
              if (r(this, e), void 0 !== e.instance) throw new Error("Error - use StreamManager.get()");
              navigator && navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints ? this._supportedConstraints = navigator.mediaDevices.getSupportedConstraints() : this._supportedConstraints = {}, this._callParams = {}, this._lastCameraDevices = [], this.__defaultParams = {}, this.logger = s.LogManager.get().createLogger(s.LogCategory.USERMEDIA, this._traceName())
          }
          return i(e, [{
              key: "setDefaultVideoSettings",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n) {
                      var r = t._validateCameraParams(e);
                      t.logger.info("Setting  default video settings, params: " + JSON.stringify(e) + ", valid params: " + JSON.stringify(r)), t.__defaultParams = r, n(null)
                  })
              }
          }, {
              key: "getDefaultVideoSettings",
              value: function() {
                  return this.__defaultParams
              }
          }, {
              key: "setCallVideoSettings",
              value: function(e, t) {
                  var n = this,
                      r = this._validateCameraParams(t);
                  return this.logger.info("Setting call " + e.id() + " video settings, params: " + JSON.stringify(t) + ", valid params: " + JSON.stringify(r)), this._callParams[e.id()] = r, new Promise(function(t, r) {
                      c.StreamManager.get().updateCallStream(e).then(function() {
                          t()
                      }).catch(function(t) {
                          n.logger.warning("Failed to set call " + e.id() + " video settings: " + t), r(t)
                      })
                  })
              }
          }, {
              key: "getCallVideoSettings",
              value: function(e) {
                  return this._callParams[e.id()]
              }
          }, {
              key: "getCallConstraints",
              value: function(e) {
                  return this._callParams[e] ? this._getVideoConstraints(this._callParams[e]) : (this._callParams[e] = this.__defaultParams, this._getVideoConstraints(this.__defaultParams))
              }
          }, {
              key: "getInputDevices",
              value: function() {
                  var e = this;
                  return navigator.mediaDevices.enumerateDevices().then(function(t) {
                      return e.logger.info("Got input devices: " + JSON.stringify(t)), e._lastCameraDevices = t.map(function(e) {
                          if ("video" === e.kind || "videoinput" === e.kind) return {
                              id: e.deviceId,
                              name: e.label,
                              group: e.groupId
                          }
                      }).filter(function(e) {
                          return void 0 !== e
                      }), e._lastCameraDevices
                  })
              }
          }, {
              key: "_getVideoConstraints",
              value: function(e) {
                  var t = {};
                  return e.cameraId ? this._lastCameraDevices && this._lastCameraDevices.some(function(t) {
                      return t.id === e.cameraId
                  }) ? (t.deviceId = {}, t.deviceId.ideal = e.cameraId) : this.logger.warning("There is no video device with id " + e.cameraId) : void 0 !== e.facingMode && (!1 === e.facingMode ? t.facingMode = "environment" : t.facingMode = "user"), e.frameHeight && (t.height = {}, e.strict ? t.height.min = e.frameHeight : t.height.ideal = e.frameHeight), e.frameWidth && (t.width = {}, e.strict ? t.width.min = e.frameWidth : t.width.ideal = e.frameWidth), e.frameRate && e.frameRate > 0 && this._supportedConstraints.frameRate && (t.frameRate = e.frameRate + ""), !Object.keys(t) || t
              }
          }, {
              key: "_validateCameraParams",
              value: function(e) {
                  if (e.videoQuality) {
                      (e.frameHeight || e.frameWidth) && this.logger.warning('"videoQuality" parameter detected. The "frameHeight" and the "frameWidth" params will be ignored');
                      var t = this._videoQualityToSize(e.videoQuality);
                      e.frameWidth = t.w, e.frameHeight = t.h
                  }
                  return e
              }
          }, {
              key: "_videoQualityToSize",
              value: function(e) {
                  switch (e) {
                      case l.Hardware.VideoQuality.VIDEO_QUALITY_HIGH:
                          return {
                              w: 1280, h: 720
                          };
                      case l.Hardware.VideoQuality.VIDEO_QUALITY_MEDIUM:
                          return {
                              w: 640, h: 480
                          };
                      case l.Hardware.VideoQuality.VIDEO_QUALITY_LOW:
                          return {
                              w: 320, h: 240
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_QQVGA:
                          return {
                              w: 160, h: 120
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_QCIF:
                          return {
                              w: 176, h: 144
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_QVGA:
                          return {
                              w: 320, h: 240
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_CIF:
                          return {
                              w: 352, h: 288
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_nHD:
                          return {
                              w: 640, h: 360
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_VGA:
                          return {
                              w: 640, h: 480
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_SVGA:
                          return {
                              w: 800, h: 600
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_HD:
                          return {
                              w: 1280, h: 720
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_UXGA:
                          return {
                              w: 1600, h: 1200
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_FHD:
                          return {
                              w: 1920, h: 1080
                          };
                      case l.Hardware.VideoQuality.VIDEO_SIZE_UHD:
                          return {
                              w: 3840, h: 2160
                          };
                      default:
                          return {
                              w: 320, h: 240
                          }
                  }
              }
          }, {
              key: "testResolutions",
              value: function(e) {
                  var t = this,
                      n = [l.Hardware.VideoQuality.VIDEO_SIZE_QQVGA, l.Hardware.VideoQuality.VIDEO_SIZE_QCIF, l.Hardware.VideoQuality.VIDEO_SIZE_QVGA, l.Hardware.VideoQuality.VIDEO_SIZE_CIF, l.Hardware.VideoQuality.VIDEO_SIZE_nHD, l.Hardware.VideoQuality.VIDEO_SIZE_VGA, l.Hardware.VideoQuality.VIDEO_SIZE_SVGA, l.Hardware.VideoQuality.VIDEO_SIZE_HD, l.Hardware.VideoQuality.VIDEO_SIZE_UXGA, l.Hardware.VideoQuality.VIDEO_SIZE_FHD, l.Hardware.VideoQuality.VIDEO_SIZE_UHD];
                  return this._lastResolutionTestResult ? new Promise(function(e, n) {
                      e(t._lastResolutionTestResult)
                  }) : this._testResolutions(n, {}, e)
              }
          }, {
              key: "_testResolutions",
              value: function(e, t, n) {
                  var r = this;
                  if (e.length) {
                      var i = e.shift(),
                          o = {
                              strict: !0
                          },
                          a = this._videoQualityToSize(i);
                      o.frameWidth = a.w, o.frameHeight = a.h, n && (o.cameraId = n);
                      var s = {
                          video: this._getVideoConstraints(o)
                      };
                      return navigator.mediaDevices.getUserMedia(s).then(function(o) {
                          return r.logger.info("_testResolutions(): Media access granted"), o.getTracks().forEach(function(e) {
                              return e.stop()
                          }), t[l.Hardware.VideoQuality[i]] = !0, r._testResolutions(e, t, n)
                      }, function(o) {
                          return r.logger.error("_testResolutions(): Media access denied: " + (o ? o.message || o.name || o : "unknown")), t[l.Hardware.VideoQuality[i]] = !1, r._testResolutions(e, t, n)
                      })
                  }
                  return this._lastResolutionTestResult = t, t
              }
          }, {
              key: "loadResolutionTestResult",
              value: function(e) {
                  return !![l.Hardware.VideoQuality.VIDEO_SIZE_QQVGA, l.Hardware.VideoQuality.VIDEO_SIZE_QCIF, l.Hardware.VideoQuality.VIDEO_SIZE_QVGA, l.Hardware.VideoQuality.VIDEO_SIZE_CIF, l.Hardware.VideoQuality.VIDEO_SIZE_nHD, l.Hardware.VideoQuality.VIDEO_SIZE_VGA, l.Hardware.VideoQuality.VIDEO_SIZE_SVGA, l.Hardware.VideoQuality.VIDEO_SIZE_HD, l.Hardware.VideoQuality.VIDEO_SIZE_UXGA, l.Hardware.VideoQuality.VIDEO_SIZE_FHD, l.Hardware.VideoQuality.VIDEO_SIZE_UHD].every(function(t) {
                      return void 0 !== e[l.Hardware.VideoQuality[t]]
                  }) && (this._lastResolutionTestResult = e, !0)
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "CameraManager"
              }
          }], [{
              key: "get",
              value: function() {
                  return void 0 === e.instance && (e.instance = new e), e.instance
              }
          }, {
              key: "legacyParamConverter",
              value: function(e) {
                  var t = {
                      videoQuality: l.Hardware.VideoQuality.VIDEO_QUALITY_MEDIUM
                  };
                  return e.width && ("string" == typeof e.width || "number" == typeof e.width ? (delete t.videoQuality, t.frameWidth = e.width) : "string" == typeof e.width.exact || "number" == typeof e.width.exact ? (delete t.videoQuality, t.frameWidth = e.width.exact, t.strict = !0) : "string" == typeof e.width.min || "number" == typeof e.width.min ? (delete t.videoQuality, t.frameWidth = e.width.min) : "string" == typeof e.width.max || "number" == typeof e.width.max ? (delete t.videoQuality, t.frameWidth = e.width.max) : "string" != typeof e.width.ideal && "number" != typeof e.width.ideal || (delete t.videoQuality, t.frameWidth = e.width.ideal)), e.height && ("string" == typeof e.height || "number" == typeof e.height ? (delete t.videoQuality, t.frameHeight = e.height) : "string" == typeof e.height.exact || "number" == typeof e.height.exact ? (delete t.videoQuality, t.frameHeight = e.height.exact, t.strict = !0) : "string" == typeof e.height.min || "number" == typeof e.height.min ? (delete t.videoQuality, t.frameHeight = e.height.min) : "string" == typeof e.height.max || "number" == typeof e.height.max ? (delete t.videoQuality, t.frameHeight = e.height.max) : "string" != typeof e.height.ideal && "number" != typeof e.height.ideal || (delete t.videoQuality, t.frameHeight = e.height.ideal)), t
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "setDefaultVideoSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "getDefaultVideoSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "setCallVideoSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "getCallVideoSettings", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "getCallConstraints", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "getInputDevices", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "_getVideoConstraints", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u.prototype, "_validateCameraParams", null), a([s.LogManager.d_trace(s.LogCategory.HARDWARE)], u, "legacyParamConverter", null), t.CameraManager = u
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(7),
      c = n(1),
      l = n(0),
      u = n(20),
      d = function() {
          function e(t, n) {
              var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                  o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                  a = this,
                  c = arguments[4];
              arguments[5];
              r(this, e), this.stream = t, this.kind = n, this.placeOnDom = i, this.isLocal = o, this.isRemoving = !1, void 0 === this.kind && (this.kind = t.getVideoTracks().length ? "video" : "audio"), this._id = u.Utils.generateUUID(), this.logger = l.LogManager.get().createLogger(l.LogCategory.USERMEDIA, this._traceName()), this.stream.getTracks().forEach(function(e) {
                  e.onended = function() {
                      a.checkStreamActive(t)
                  }
              }), this.stream.getTracks().length && (this.element = document.getElementById(this.stream.getTracks()[0].id) || document.createElement("sharing" === this.kind ? "video" : this.kind), this.element.autoplay = !0, this.isLocal && (this.element.muted = !0), this.element.setAttribute("playsinline", null), c ? document.getElementById("voximplantlocalvideo") ? this.element.id = this.stream.getTracks()[0].id : this.element.id = "voximplantlocalvideo" : this.element.id = this.stream.getTracks()[0].id, "audio" !== n && (this.element.width = 400, this.element.height = 300), s.default.attachMedia(this.stream, this.element), this.placeOnDom && this.renderDefault())
          }
          return i(e, [{
              key: "checkStreamActive",
              value: function(e) {
                  e.getTracks().some(function(e) {
                      return "live" === e.readyState
                  }) || this.clear()
              }
          }, {
              key: "renderDefault",
              value: function() {
                  var e = c.Client.getInstance(),
                      t = this.isLocal ? e.config().localVideoContainerId : e.config().remoteVideoContainerId,
                      n = document.getElementById(t);
                  this.render(n)
              }
          }, {
              key: "render",
              value: function(e) {
                  var t = this;
                  if (this.logger.info("render()"), !(c.Client.getInstance().config() && c.Client.getInstance().config().experiments && c.Client.getInstance().config().experiments.preventRendering)) {
                      var n = e || document.body;
                      void 0 !== this.element.parentElement && null !== this.element.parentElement ? this.element.parentElement && this.element.parentElement.removeChild(this.element) : this.element.parentNode && this.element.parentNode && this.element.parentNode.removeChild(this.element), n.appendChild(this.element), this.element.play().then(function() {}, function(e) {
                          setTimeout(function() {
                              t.element.play().then(function() {}, function(e) {
                                  t.logger.warning("Can't start playing MediaRenderer ID:" + t._id)
                              })
                          }, 400)
                      })
                  }
              }
          }, {
              key: "clear",
              value: function() {
                  if (this.isRemoving) return void this.logger.info("MediaRendered ID: already removing " + this._id + ". Ignored.");
                  this.isRemoving = !0, this.onBeforeDestroy && this.onBeforeDestroy(), this.element && (s.default.detachMedia(this.element), this.element.id = "", void 0 !== this.element.parentElement && null !== this.element.parentElement ? this.element.parentElement && this.element.parentElement.removeChild(this.element) : this.element.parentNode && this.element.parentNode && this.element.parentNode.removeChild(this.element)), this.onDestroy && this.onDestroy()
              }
          }, {
              key: "setVolume",
              value: function(e) {
                  this.logger.info("setVolume(" + e + ")"), this.element && (this.element.volume = e)
              }
          }, {
              key: "useAudioOutput",
              value: function(e) {
                  this.logger.info("useAudioOutput(" + e + ")");
                  try {
                      this.element.setSinkId(e)
                  } catch (e) {
                      this.logger.warning("Set audio output is impossible. Browser not support this option.")
                  }
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "MediaRenderer"
              }
          }, {
              key: "id",
              get: function() {
                  return this._id
              }
          }]), e
      }();
  a([l.LogManager.d_trace(l.LogCategory.USERMEDIA)], d.prototype, "checkStreamActive", null), a([l.LogManager.d_trace(l.LogCategory.USERMEDIA)], d.prototype, "renderDefault", null), a([l.LogManager.d_trace(l.LogCategory.USERMEDIA)], d.prototype, "render", null), a([l.LogManager.d_trace(l.LogCategory.USERMEDIA)], d.prototype, "clear", null), a([l.LogManager.d_trace(l.LogCategory.USERMEDIA)], d.prototype, "setVolume", null), a([l.LogManager.d_trace(l.LogCategory.USERMEDIA)], d.prototype, "useAudioOutput", null), t.MediaRenderer = d
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = n(39),
      l = n(37),
      u = n(30),
      d = n(5),
      g = n(10),
      f = function() {
          function e() {
              r(this, e), this._endpointList = {}, this._trackListMap = {}, this._trackKindMap = {}, this._endpointInfo = {}, this._mediaRendererList = {}, this.logger = s.LogManager.get().createLogger(s.LogCategory.ENDPOINT, "EndpointManager")
          }
          return i(e, [{
              key: "setCallVolume",
              value: function(e, t) {
                  var n = this._endpointList[e.id()] || {};
                  Object.values(n).forEach(function(e) {
                      (e.mediaRenderers || []).forEach(function(e) {
                          return e.setVolume(t)
                      })
                  })
              }
          }, {
              key: "_getEndpointByTrackId",
              value: function(e, t) {
                  var n = this._trackListMap[e.id()] || {},
                      r = this._endpointList[e.id()] || {};
                  return n[t] && r[n[t]] ? r[n[t]] : this.getDefaultEndPoint(e)
              }
          }, {
              key: "_getMediaTypeTrack",
              value: function(e, t) {
                  return (this._trackKindMap[e.id()] || {})[t.id] || t.kind
              }
          }, {
              key: "addEndPoint",
              value: function(e, t) {
                  var n = this._endpointInfo[e.id()];
                  return n && (this._endpointList[e.id()][t.id] = t, n[t.id] ? (t.displayName = n[t.id].displayName, t.place = n[t.id].place, t.sipUri = n[t.id].sipURI, t.userName = n[t.id].username, e.dispatchEvent({
                      name: d.CallEvents.EndpointAdded,
                      call: e,
                      endpoint: t
                  })) : t.isDefault && e.dispatchEvent({
                      name: d.CallEvents.EndpointAdded,
                      call: e,
                      endpoint: t
                  })), t
              }
          }, {
              key: "getDefaultEndPoint",
              value: function(e) {
                  var t = this._endpointList[e.id()] || {};
                  if (t[e.id()]) return t[e.id()];
                  var n = new c.Endpoint(!0);
                  return n.id = e.id(), this.addEndPoint(e, n), n
              }
          }, {
              key: "deleteEndpoint",
              value: function(e, t) {
                  (this._endpointList[e.id()] || {})[t.id] ? (t.mediaRenderers.forEach(function(e) {
                      e.clear()
                  }), t.dispatchEvent({
                      name: u.EndpointEvents.Removed,
                      call: e,
                      endpoint: t
                  }), delete this._endpointList[e.id()][t.id]) : this.logger.error("Trying remove non existing endpoint with id:" + t.id + " on the call: " + e.id())
              }
          }, {
              key: "addStreamToEndpoint",
              value: function(e, t, n) {
                  var r = this,
                      i = "video";
                  1 === n.getTracks().length && (i = this.getMediaTypeTrack(e, n.getTracks()[0]));
                  var o = new l.MediaRenderer(n, i, !1, !1, void 0, e.settings.isConference);
                  this._mediaRendererList[e.id()] || (this._mediaRendererList[e.id()] = []), this._mediaRendererList[e.id()].push(o), t.mediaRenderers.push(o), t.dispatchEvent({
                      name: u.EndpointEvents.RemoteMediaAdded,
                      call: e,
                      endpoint: t,
                      mediaRenderer: o
                  }), e.dispatchEvent({
                      name: d.CallEvents.MediaElementCreated,
                      call: e,
                      stream: o.stream,
                      element: o.element,
                      type: o.kind
                  }), o.onBeforeDestroy = function() {
                      t && t.mediaRenderers && (t.mediaRenderers = t.mediaRenderers.filter(function(e) {
                          return e.id !== o.id
                      })), r._mediaRendererList && r._mediaRendererList[e.id()] && (r._mediaRendererList[e.id()] = r._mediaRendererList[e.id()].filter(function(e) {
                          return e.id !== o.id
                      })), t.dispatchEvent({
                          name: u.EndpointEvents.RemoteMediaRemoved,
                          call: e,
                          endpoint: t,
                          mediaRenderer: o
                      }), e.dispatchEvent({
                          name: d.CallEvents.MediaElementRemoved,
                          call: e,
                          stream: o.stream,
                          element: o.element,
                          type: o.kind
                      })
                  }
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "AbstractEndpointManager"
              }
          }, {
              key: "addStream",
              value: function(e, t) {
                  var n = t.getTracks(),
                      r = void 0;
                  for (var i in n) r = r || this.getEndpointByTrack(e, n[i]);
                  r && this.addStreamToEndpoint(e, r, t)
              }
          }, {
              key: "addTrack",
              value: function(e, t) {
                  var n = this;
                  e.settings.isConference && t.muted ? t.onunmute = function() {
                      t.onunmute = void 0, n.addStream(e, new MediaStream([t]))
                  } : this.addStream(e, new MediaStream([t]))
              }
          }, {
              key: "clear",
              value: function(e) {
                  var t = this;
                  return delete this._mediaRendererList[e.id()], delete this._endpointInfo[e.id()], delete this._trackListMap[e.id()], new Promise(function(n, r) {
                      var i = t._endpointList[e.id()] || {},
                          o = !0,
                          a = !1,
                          s = void 0;
                      try {
                          for (var c, l = Object.values(i)[Symbol.iterator](); !(o = (c = l.next()).done); o = !0) {
                              var d = c.value;
                              d.mediaRenderers.forEach(function(e) {
                                  e.clear()
                              }), d.dispatchEvent({
                                  name: u.EndpointEvents.Removed,
                                  call: e,
                                  endpoint: d
                              })
                          }
                      } catch (e) {
                          a = !0, s = e
                      } finally {
                          try {
                              !o && l.return && l.return()
                          } finally {
                              if (a) throw s
                          }
                      }
                      delete t._endpointList[e.id()], n()
                  })
              }
          }, {
              key: "endpointInfoUpdated",
              value: function(e, t, n) {
                  var r = this._endpointInfo[e.id()] || {},
                      i = this._endpointList[e.id()] || {};
                  r[n.id] = n;
                  var o = i[n.id];
                  if (o && (t == g.Constants.VI_CONF_PARTICIPANT_INFO_ADDED || t === g.Constants.VI_CONF_PARTICIPANT_INFO_UPDATED)) {
                      var a = !o.sipUri;
                      o.displayName = n.displayName, o.place = n.place, o.sipUri = n.sipURI, o.userName = n.username, a ? e.dispatchEvent({
                          name: d.CallEvents.EndpointAdded,
                          call: e,
                          endpoint: o
                      }) : o.dispatchEvent({
                          name: u.EndpointEvents.InfoUpdated,
                          call: e,
                          endpoint: o
                      })
                  }
                  this._endpointInfo[e.id()] = r
              }
          }, {
              key: "setEndpointDescription",
              value: function(e, t) {
                  var n = this;
                  if (t && t.endpoints) {
                      var r = this._endpointList[e.id()],
                          i = [];
                      for (var o in r) r.hasOwnProperty(o) && (t.endpoints[o] || o === e.id() || i.push(r[o]));
                      i.forEach(function(t) {
                          return n.deleteEndpoint(e, t)
                      });
                      var a = {},
                          s = {};
                      for (var l in t.endpoints)
                          if (t.endpoints.hasOwnProperty(l)) {
                              if ("" === l) this.getDefaultEndPoint(e);
                              else if (!r[l]) {
                                  var u = new c.Endpoint(!1);
                                  u.id = l, u.place = t.endpoints[l].place, this.addEndPoint(e, u)
                              }
                              if (t.endpoints[l].tracks)
                                  for (var d in t.endpoints[l].tracks) t.endpoints[l].tracks.hasOwnProperty(d) && (a[d] = l, s[d] = t.endpoints[l].tracks[d])
                          } this._trackListMap[e.id()] = a, this._trackKindMap[e.id()] = s
                  }
              }
          }, {
              key: "useAudioOutput",
              value: function(e, t) {
                  var n = this._endpointList[e.id()];
                  n && Object.values(n).forEach(function(e) {
                      return e.useAudioOutput(t)
                  })
              }
          }, {
              key: "getEndpoints",
              value: function(e) {
                  return Object.values(this._endpointList[e.id()] || {})
              }
          }, {
              key: "registerCall",
              value: function(e) {
                  this._endpointList[e.id()] = {}, this._trackListMap[e.id()] = {}, this._trackKindMap[e.id()] = {}, this._endpointInfo[e.id()] = {}, this._mediaRendererList[e.id()] = []
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "setCallVolume", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "_getEndpointByTrackId", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "_getMediaTypeTrack", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "addEndPoint", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "getDefaultEndPoint", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "deleteEndpoint", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "addStreamToEndpoint", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "addStream", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "addTrack", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "clear", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "endpointInfoUpdated", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "setEndpointDescription", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "useAudioOutput", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "getEndpoints", null), a([s.LogManager.d_trace(s.LogCategory.ENDPOINT)], f.prototype, "registerCall", null), t.AbstractEndpointManager = f
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var c = n(15),
      l = n(30),
      u = n(0),
      d = function(e) {
          function t() {
              var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              r(this, t);
              var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return n.isDefault = e, n.sipUri = "", n.displayName = "", n.userName = "", n.mediaRenderers = [], n.addDefaultEventListener(l.EndpointEvents.RemoteMediaAdded, function(e) {
                  e.mediaRenderer.renderDefault()
              }), n.logger = u.LogManager.get().createLogger(u.LogCategory.ENDPOINT, n._traceName() + " " + n.id), n
          }
          return o(t, e), a(t, [{
              key: "useAudioOutput",
              value: function(e) {
                  this.logger.info("useAudioOutput(" + e + ")"), this.mediaRenderers && this.mediaRenderers.forEach(function(t) {
                      return t.useAudioOutput(e)
                  })
              }
          }, {
              key: "updateInfo",
              value: function(e) {
                  this.place = e.place, this.sipUri = e.sipURI, this.displayName = e.displayName, this.userName = e.username
              }
          }, {
              key: "on",
              value: function(e, n, r) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "on", this).call(this, e, n)
              }
          }, {
              key: "off",
              value: function(e, n) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "off", this).call(this, e, n)
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "Endpoint"
              }
          }]), t
      }(c.EventTarget);
  t.Endpoint = d
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = function() {
      function e(t) {
          r(this, e), this.originalSDP = t
      }
      return i(e, [{
          key: "getCodecList",
          value: function() {
              this.originalCodecList = {
                  prefix: "",
                  sections: [],
                  sufix: ""
              };
              var t = RegExp.prototype.test.bind(/^([a-z])=(.*)/),
                  n = e.splitSections(this.originalSDP);
              this.originalCodecList.prefix = n[0];
              for (var r = 1; r < n.length; r++) {
                  var i = {
                          kind: "audio",
                          firstLine: "",
                          prefix: "",
                          sufix: "",
                          codec: []
                      },
                      o = n[r].split("\na=rtpmap");
                  o = o.map(function(e, t) {
                      return (t > 0 ? "a=rtpmap" + e : e).trim() + "\r\n"
                  }), i.prefix = o.shift();
                  var a = o.pop();
                  a = a.split(/(\r\n|\r|\n)/).filter(t);
                  var s = !0;
                  for (o.push(""); s;)
                      if (s = !1, 0 !== a.length) {
                          var c = a.shift();
                          0 === c.indexOf("a=rtpmap") || 0 === c.indexOf("a=rtcp-fb") || 0 === c.indexOf("a=fmtp") || 0 === c.indexOf("a=x-caps") || 0 === c.indexOf("a=maxptime") ? (o[o.length - 1] += c + "\r\n", s = !0) : a.unshift(c)
                      } for (var l = 0; l < o.length; l++) i.codec.push(o[l].split(/(\r\n|\r|\n)/).filter(t));
                  var u = i.prefix.split(/(\r\n|\r|\n)/).filter(t);
                  i.firstLine = u.shift();
                  var d = i.firstLine.split(" ");
                  d.splice(-1 * i.codec.length, i.codec.length), i.kind = d[0].substring(2), i.prefix = u.join("\r\n") + "\r\n", i.firstLine = d.join(" "), a.length > 0 && (i.sufix = a.join("\r\n") + "\r\n"), this.originalCodecList.sections.push(i)
              }
              return this.originalCodecList
          }
      }, {
          key: "getUserCodecList",
          value: function() {
              void 0 === this.originalCodecList && this.getCodecList();
              var t = {
                  sections: []
              };
              return t.sections = this.originalCodecList.sections.filter(function(e) {
                  return "video" === e.kind || "audio" === e.kind
              }).map(function(t, n, r) {
                  var i = {
                          kind: t.kind,
                          codec: t.codec.map(function(t) {
                              return e.codecToUserCodec(t)
                          })
                      },
                      o = [],
                      a = !0,
                      s = !1,
                      c = void 0;
                  try {
                      for (var l, u = i.codec[Symbol.iterator](); !(a = (l = u.next()).done); a = !0) {
                          var d = l.value; - 1 === o.indexOf(d) && o.push(d)
                      }
                  } catch (e) {
                      s = !0, c = e
                  } finally {
                      try {
                          !a && u.return && u.return()
                      } finally {
                          if (s) throw c
                      }
                  }
                  return i.codec = o, i
              }), t
          }
      }, {
          key: "setUserCodecList",
          value: function(t) {
              void 0 === this.originalCodecList && this.getCodecList();
              for (var n = 0; n < t.sections.length; n++) t.sections[n].kind === this.originalCodecList.sections[n].kind && (this.originalCodecList.sections[n].codec = e.resortSection(t.sections[n].codec, this.originalCodecList.sections[n].codec))
          }
      }, {
          key: "getSDP",
          value: function() {
              for (var e = this.originalCodecList.prefix, t = 0; t < this.originalCodecList.sections.length; t++) {
                  var n = "",
                      r = [];
                  if ("video" === this.originalCodecList.sections[t].kind) {
                      var i = this.matchVideoCodecs(this.originalCodecList.sections[t].codec);
                      n = i.codecSDP, r = i.codecOrder
                  } else
                      for (var o = 0; o < this.originalCodecList.sections[t].codec.length; o++) r.push(this.originalCodecList.sections[t].codec[o][0].split(" ")[0].substring(9)), n += this.originalCodecList.sections[t].codec[o].join("\r\n") + "\r\n";
                  e += this.originalCodecList.sections[t].firstLine + " " + r.join(" ") + "\r\n", e += this.originalCodecList.sections[t].prefix, e += n, e += this.originalCodecList.sections[t].sufix
              }
              return e
          }
      }, {
          key: "matchVideoCodecs",
          value: function(t) {
              var n = e.splitSections(this.originalSDP).find(function(e) {
                  return !!~e.indexOf("m=video")
              });
              n = n.split("\na=ssrc-group")[0].split("\na=rtpmap").map(function(e, t) {
                  return (t > 0 ? "a=rtpmap" + e : e).trim() + "\r\n"
              }), ~n[0].indexOf("m=video") && n.shift();
              var r = [],
                  i = [],
                  o = [],
                  a = !1,
                  s = !1,
                  c = t.reduce(function(e, t) {
                      return ~t[0].indexOf("rtx") && ~t[1].indexOf("apt=") ? e.push(t.join("\r\n") + "\r\n") : o.push(t.join("\r\n") + "\r\n"), e
                  }, []),
                  l = function(e) {
                      var t = e.split(" ")[0].substring(9);
                      r.push(e), i.push(t);
                      var o = c.find(function(e) {
                          return !!~e.indexOf("apt=" + t)
                      }) || n.find(function(e) {
                          return ~e.indexOf("rtx") && ~e.indexOf("apt=" + t)
                      });
                      o && (r.push(o), i.push(o.split(" ")[0].substring(9)))
                  };
              if (o.forEach(function(e, t) {
                      ~e.indexOf("ulpfec") && (a = !0), ~e.indexOf("red") && (s = !0), l(e)
                  }), !s || !a) {
                  n.filter(function(e) {
                      return !s && ~e.indexOf("red") || !a && ~e.indexOf("ulpfec")
                  }).forEach(function(e) {
                      return l(e)
                  })
              }
              return {
                  codecOrder: i,
                  codecSDP: r.join("")
              }
          }
      }, {
          key: "_traceName",
          value: function() {
              return "CodecSorter"
          }
      }], [{
          key: "splitSections",
          value: function(e) {
              return e.split("\nm=").map(function(e, t) {
                  return (t > 0 ? "m=" + e : e).trim() + "\r\n"
              })
          }
      }, {
          key: "codecToUserCodec",
          value: function(e) {
              var t = e[0].split(" ");
              return t.shift(), t.join(" ")
          }
      }, {
          key: "resortSection",
          value: function(t, n) {
              for (var r = [], i = 0; i < t.length; i++)
                  for (var o = 0; o < n.length; o++) t[i] === e.codecToUserCodec(n[o]) && r.push(n[o]);
              return r
          }
      }, {
          key: "downOpusBandwidth",
          value: function(e) {
              return new Promise(function(t, n) {
                  for (var r = RegExp.prototype.test.bind(/^([a-z])=(.*)/), i = e.sdp.split(/(\r\n|\r|\n)/).filter(r), o = !1, a = 0; a < i.length; a++) - 1 !== i[a].indexOf("a=fmtp:114") && (i[a] = "a=fmtp:114 minptime=10; useinbandfec=1; sprop-maxcapturerate=8000", o = !0), -1 !== i[a].indexOf("a=fmtp:111") && (i[a] = "a=fmtp:111 minptime=10; useinbandfec=1; sprop-maxcapturerate=8000", o = !0);
                  o || n(e), t(new RTCSessionDescription({
                      sdp: i.join("\r\n") + "\r\n",
                      type: e.type
                  }))
              })
          }
      }]), e
  }();
  t.CodecSorter = o
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  n(24);
  ! function(e) {
      e[e.Chat = "chat"] = "Chat"
  }(t.MsgService || (t.MsgService = {}));
  ! function(e) {
      e[e.none = 0] = "none", e[e.can_write = 1] = "can_write", e[e.can_edit = 2] = "can_edit", e[e.can_remove = 4] = "can_remove", e[e.can_manage_participants = 8] = "can_manage_participants", e[e.can_edit_all = 16] = "can_edit_all", e[e.can_remove_all = 32] = "can_remove_all", e[e.is_owner = 32768] = "is_owner", e[e.all = 65535] = "all"
  }(t.MsgPermissions || (t.MsgPermissions = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(33),
      a = n(28),
      s = n(0),
      c = n(3),
      l = n(2),
      u = n(20),
      d = n(14),
      g = n(1),
      f = "The operator status update failed by timeout.",
      p = "You try to perform multiple ACD operations at the same time. This can lead to an unexpected behavior of your application.",
      v = "You probably use the same credentials in the different browsers or multiple browser's windows. This can cause conflicts between instances.",
      h = function() {
          function e() {
              r(this, e)
          }
          return i(e, null, [{
              key: "setConnectionId",
              value: function(e) {
                  this._connectionId = e
              }
          }, {
              key: "removeConnectionId",
              value: function() {
                  this._connectionId = void 0
              }
          }, {
              key: "setStatus",
              value: function(t) {
                  var n = this;
                  return new Promise(function(r, i) {
                      e._checkBeforeRun(a.OperatorACDStatuses[t], i);
                      var o = e.newUUID;
                      l.VoxSignaling.get().callRemoteFunction(c.RemoteFunction.setOperatorACDStatus, t, o), n._acdRequests.push({
                          resolve: r,
                          reject: i,
                          timer: window.setTimeout(function() {
                              e._acdRequests = e._acdRequests.filter(function(e) {
                                  return e.uuid !== o
                              }), i(f)
                          }, 58e3),
                          uuid: o,
                          status: t
                      })
                  })
              }
          }, {
              key: "getStatus",
              value: function() {
                  var t = this;
                  return new Promise(function(n, r) {
                      e._checkBeforeRun(void 0, r);
                      var i = e.newUUID;
                      l.VoxSignaling.get().callRemoteFunction(c.RemoteFunction.getOperatorACDStatus, i), t._acdRequests.push({
                          resolve: n,
                          reject: r,
                          timer: window.setTimeout(function() {
                              e._acdRequests = e._acdRequests.filter(function(e) {
                                  return e.uuid !== i
                              }), r(f)
                          }, 58e3),
                          uuid: i
                      })
                  })
              }
          }, {
              key: "onStatusUpdated",
              value: function(t, n) {
                  e._checkConnectionId(n);
                  var r = e._getActorByUUID(n),
                      i = r.actor,
                      o = r.actorIdx;
                  if (i) {
                      if (clearTimeout(i.timer), 0 !== o)
                          for (var a = 0; a < o; a++) clearTimeout(e._acdRequests[a].timer), e._acdRequests[a].reject(new Error(u.Utils.strFormat("The {0} status is set in your code after {1}. The {0} status is ignored.", i.status || "get operation", t)));
                      void 0 === i.status || i.status === t ? i.resolve(t) : i.reject(new Error(u.Utils.strFormat("The {0} status is not acceptable for the current operator state. The operator is {1} now. Please, check the ACD module documentation for details.", i.status, t))), e._acdRequests.splice(0, o + 1)
                  }
                  g.Client.getInstance().dispatchEvent({
                      name: d.Events.ACDStatusUpdated,
                      id: e._getConnectonIdFromUUID(n),
                      status: t
                  })
              }
          }, {
              key: "_checkBeforeRun",
              value: function(t, n) {
                  e._connectionId || n(new Error("You can't set an operator status before login.")), e._acdRequests.length > 0 && (s.LogManager.get().writeMessage(s.LogCategory.CLIENT, "ACD", s.LogLevel.WARNING, p), g.Client.getInstance().dispatchEvent({
                      name: d.Events.ACDError,
                      code: 5,
                      message: p
                  })), void 0 === t || Object.values(a.OperatorACDStatuses).includes(t) || n(new Error(u.Utils.strFormat("Wrong ACD status name {0}", t)))
              }
          }, {
              key: "_getActorByUUID",
              value: function(e) {
                  var t = -1;
                  return {
                      actor: this._acdRequests.find(function(n, r) {
                          if (n.uuid === e) return t = r, !0
                      }),
                      actorIdx: t
                  }
              }
          }, {
              key: "_getConnectonIdFromUUID",
              value: function(t) {
                  var n = t.split("_");
                  return 1 === n.length || "gw" === n[1] ? e._connectionId : n[1]
              }
          }, {
              key: "_checkConnectionId",
              value: function(t) {
                  var n = t.split("_");
                  1 !== n.length && n[1] === e._connectionId || (g.Client.getInstance().dispatchEvent({
                      name: d.Events.ACDError,
                      code: 6,
                      message: v
                  }), s.LogManager.get().writeMessage(s.LogCategory.CLIENT, "ACD", s.LogLevel.WARNING, v))
              }
          }, {
              key: "newUUID",
              get: function() {
                  return (new o.default).toString() + "_" + e._connectionId
              }
          }]), e
      }();
  h._acdRequests = [], t.default = h
}, function(e, t, n) {
  "use strict";
  var r = {};
  r.generateIdentifier = function() {
      return Math.random().toString(36).substr(2, 10)
  }, r.localCName = r.generateIdentifier(), r.splitLines = function(e) {
      return e.trim().split("\n").map(function(e) {
          return e.trim()
      })
  }, r.splitSections = function(e) {
      return e.split("\nm=").map(function(e, t) {
          return (t > 0 ? "m=" + e : e).trim() + "\r\n"
      })
  }, r.getDescription = function(e) {
      var t = r.splitSections(e);
      return t && t[0]
  }, r.getMediaSections = function(e) {
      var t = r.splitSections(e);
      return t.shift(), t
  }, r.matchPrefix = function(e, t) {
      return r.splitLines(e).filter(function(e) {
          return 0 === e.indexOf(t)
      })
  }, r.parseCandidate = function(e) {
      var t;
      t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
      for (var n = {
              foundation: t[0],
              component: parseInt(t[1], 10),
              protocol: t[2].toLowerCase(),
              priority: parseInt(t[3], 10),
              ip: t[4],
              port: parseInt(t[5], 10),
              type: t[7]
          }, r = 8; r < t.length; r += 2) switch (t[r]) {
          case "raddr":
              n.relatedAddress = t[r + 1];
              break;
          case "rport":
              n.relatedPort = parseInt(t[r + 1], 10);
              break;
          case "tcptype":
              n.tcpType = t[r + 1];
              break;
          case "ufrag":
              n.ufrag = t[r + 1], n.usernameFragment = t[r + 1];
              break;
          default:
              n[t[r]] = t[r + 1]
      }
      return n
  }, r.writeCandidate = function(e) {
      var t = [];
      t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
      var n = e.type;
      return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
  }, r.parseIceOptions = function(e) {
      return e.substr(14).split(" ")
  }, r.parseRtpMap = function(e) {
      var t = e.substr(9).split(" "),
          n = {
              payloadType: parseInt(t.shift(), 10)
          };
      return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ? parseInt(t[2], 10) : 1, n.numChannels = n.channels, n
  }, r.writeRtpMap = function(e) {
      var t = e.payloadType;
      void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
      var n = e.channels || e.numChannels || 1;
      return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n"
  }, r.parseExtmap = function(e) {
      var t = e.substr(9).split(" ");
      return {
          id: parseInt(t[0], 10),
          direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
          uri: t[1]
      }
  }, r.writeExtmap = function(e) {
      return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
  }, r.parseFmtp = function(e) {
      for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) t = r[i].trim().split("="), n[t[0].trim()] = t[1];
      return n
  }, r.writeFmtp = function(e) {
      var t = "",
          n = e.payloadType;
      if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
          var r = [];
          Object.keys(e.parameters).forEach(function(t) {
              e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
          }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
      }
      return t
  }, r.parseRtcpFb = function(e) {
      var t = e.substr(e.indexOf(" ") + 1).split(" ");
      return {
          type: t.shift(),
          parameter: t.join(" ")
      }
  }, r.writeRtcpFb = function(e) {
      var t = "",
          n = e.payloadType;
      return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
          t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
      }), t
  }, r.parseSsrcMedia = function(e) {
      var t = e.indexOf(" "),
          n = {
              ssrc: parseInt(e.substr(7, t - 7), 10)
          },
          r = e.indexOf(":", t);
      return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
  }, r.getMid = function(e) {
      var t = r.matchPrefix(e, "a=mid:")[0];
      if (t) return t.substr(6)
  }, r.parseFingerprint = function(e) {
      var t = e.substr(14).split(" ");
      return {
          algorithm: t[0].toLowerCase(),
          value: t[1]
      }
  }, r.getDtlsParameters = function(e, t) {
      return {
          role: "auto",
          fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)
      }
  }, r.writeDtlsParameters = function(e, t) {
      var n = "a=setup:" + t + "\r\n";
      return e.fingerprints.forEach(function(e) {
          n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
      }), n
  }, r.getIceParameters = function(e, t) {
      var n = r.splitLines(e);
      return n = n.concat(r.splitLines(t)), {
          usernameFragment: n.filter(function(e) {
              return 0 === e.indexOf("a=ice-ufrag:")
          })[0].substr(12),
          password: n.filter(function(e) {
              return 0 === e.indexOf("a=ice-pwd:")
          })[0].substr(10)
      }
  }, r.writeIceParameters = function(e) {
      return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
  }, r.parseRtpParameters = function(e) {
      for (var t = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: [],
              rtcp: []
          }, n = r.splitLines(e), i = n[0].split(" "), o = 3; o < i.length; o++) {
          var a = i[o],
              s = r.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
          if (s) {
              var c = r.parseRtpMap(s),
                  l = r.matchPrefix(e, "a=fmtp:" + a + " ");
              switch (c.parameters = l.length ? r.parseFmtp(l[0]) : {}, c.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(r.parseRtcpFb), t.codecs.push(c), c.name.toUpperCase()) {
                  case "RED":
                  case "ULPFEC":
                      t.fecMechanisms.push(c.name.toUpperCase())
              }
          }
      }
      return r.matchPrefix(e, "a=extmap:").forEach(function(e) {
          t.headerExtensions.push(r.parseExtmap(e))
      }), t
  }, r.writeRtpDescription = function(e, t) {
      var n = "";
      n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map(function(e) {
          return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
      }).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
          n += r.writeRtpMap(e), n += r.writeFmtp(e), n += r.writeRtcpFb(e)
      });
      var i = 0;
      return t.codecs.forEach(function(e) {
          e.maxptime > i && (i = e.maxptime)
      }), i > 0 && (n += "a=maxptime:" + i + "\r\n"), n += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function(e) {
          n += r.writeExtmap(e)
      }), n
  }, r.parseRtpEncodingParameters = function(e) {
      var t, n = [],
          i = r.parseRtpParameters(e),
          o = -1 !== i.fecMechanisms.indexOf("RED"),
          a = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
          s = r.matchPrefix(e, "a=ssrc:").map(function(e) {
              return r.parseSsrcMedia(e)
          }).filter(function(e) {
              return "cname" === e.attribute
          }),
          c = s.length > 0 && s[0].ssrc,
          l = r.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
              return e.substr(17).split(" ").map(function(e) {
                  return parseInt(e, 10)
              })
          });
      l.length > 0 && l[0].length > 1 && l[0][0] === c && (t = l[0][1]), i.codecs.forEach(function(e) {
          if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
              var r = {
                  ssrc: c,
                  codecPayloadType: parseInt(e.parameters.apt, 10)
              };
              c && t && (r.rtx = {
                  ssrc: t
              }), n.push(r), o && (r = JSON.parse(JSON.stringify(r)), r.fec = {
                  ssrc: t,
                  mechanism: a ? "red+ulpfec" : "red"
              }, n.push(r))
          }
      }), 0 === n.length && c && n.push({
          ssrc: c
      });
      var u = r.matchPrefix(e, "b=");
      return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3 : void 0, n.forEach(function(e) {
          e.maxBitrate = u
      })), n
  }, r.parseRtcpParameters = function(e) {
      var t = {},
          n = r.matchPrefix(e, "a=ssrc:").map(function(e) {
              return r.parseSsrcMedia(e)
          }).filter(function(e) {
              return "cname" === e.attribute
          })[0];
      n && (t.cname = n.value, t.ssrc = n.ssrc);
      var i = r.matchPrefix(e, "a=rtcp-rsize");
      t.reducedSize = i.length > 0, t.compound = 0 === i.length;
      var o = r.matchPrefix(e, "a=rtcp-mux");
      return t.mux = o.length > 0, t
  }, r.parseMsid = function(e) {
      var t, n = r.matchPrefix(e, "a=msid:");
      if (1 === n.length) return t = n[0].substr(7).split(" "), {
          stream: t[0],
          track: t[1]
      };
      var i = r.matchPrefix(e, "a=ssrc:").map(function(e) {
          return r.parseSsrcMedia(e)
      }).filter(function(e) {
          return "msid" === e.attribute
      });
      return i.length > 0 ? (t = i[0].value.split(" "), {
          stream: t[0],
          track: t[1]
      }) : void 0
  }, r.generateSessionId = function() {
      return Math.random().toString().substr(2, 21)
  }, r.writeSessionBoilerplate = function(e, t) {
      var n = void 0 !== t ? t : 2;
      return "v=0\r\no=thisisadapterortc " + (e || r.generateSessionId()) + " " + n + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
  }, r.writeMediaSection = function(e, t, n, i) {
      var o = r.writeRtpDescription(e.kind, t);
      if (o += r.writeIceParameters(e.iceGatherer.getLocalParameters()), o += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", e.direction ? o += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
          var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
          o += "a=" + a, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
      }
      return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), o
  }, r.getDirection = function(e, t) {
      for (var n = r.splitLines(e), i = 0; i < n.length; i++) switch (n[i]) {
          case "a=sendrecv":
          case "a=sendonly":
          case "a=recvonly":
          case "a=inactive":
              return n[i].substr(2)
      }
      return t ? r.getDirection(t) : "sendrecv"
  }, r.getKind = function(e) {
      return r.splitLines(e)[0].split(" ")[0].substr(2)
  }, r.isRejected = function(e) {
      return "0" === e.split(" ", 2)[1]
  }, r.parseMLine = function(e) {
      var t = r.splitLines(e),
          n = t[0].substr(2).split(" ");
      return {
          kind: n[0],
          port: parseInt(n[1], 10),
          protocol: n[2],
          fmt: n.slice(3).join(" ")
      }
  }, r.parseOLine = function(e) {
      var t = r.matchPrefix(e, "o=")[0],
          n = t.substr(2).split(" ");
      return {
          username: n[0],
          sessionId: n[1],
          sessionVersion: parseInt(n[2], 10),
          netType: n[3],
          addressType: n[4],
          address: n[5]
      }
  }, e.exports = r
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(18),
      c = n(25),
      l = n(34),
      u = n(26),
      d = n(0),
      g = n(19),
      f = n(24),
      p = n(45),
      v = n(27),
      h = function() {
          function e() {
              var t = this;
              if (r(this, e), e.instance) throw new Error(p.MESSAGING_ERR_2);
              this.signalling = s.MsgSignaling.get(), this.signalling.addEventListener(f.MsgEvent.onCreateConversation, function(e, n) {
                  t.resolveEvent(e, g.default.MessengerEvents.CreateConversation, n)
              }), this.signalling.addEventListener(f.MsgEvent.onEditConversation, function(e, n) {
                  t.resolveEvent(e, g.default.MessengerEvents.EditConversation, n)
              }), this.signalling.addEventListener(f.MsgEvent.onRemoveConversation, function(e, t) {
                  c.Messenger.getInstance()._dispatchEvent(g.default.MessengerEvents.RemoveConversation, {
                      uuid: e.object.uuid,
                      seq: e.seq,
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      initiator: Number(e.initiator),
                      timestamp: "number" == typeof e.timestamp ? 1e3 * e.timestamp : void 0,
                      requestUuid: t
                  }, t)
              }), this.signalling.addEventListener(f.MsgEvent.onGetConversation, function(e, n) {
                  t.resolveEvent(e, g.default.MessengerEvents.GetConversation, n)
              }), this.signalling.addEventListener(f.MsgEvent.onGetPublicConversations, function(e, t) {
                  c.Messenger.getInstance()._dispatchEvent(g.default.MessengerEvents.GetPublicConversations, {
                      conversations: e.object.uuid,
                      initiator: Number(e.initiator),
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      requestUuid: t
                  }, t)
              }), this.signalling.addEventListener(f.MsgEvent.onSendMessage, function(e, n) {
                  t.resolveMessageEvent(e, g.default.MessengerEvents.SendMessage, n)
              }), this.signalling.addEventListener(f.MsgEvent.onEditMessage, function(e, n) {
                  t.resolveMessageEvent(e, g.default.MessengerEvents.EditMessage, n)
              }), this.signalling.addEventListener(f.MsgEvent.onRemoveMessage, function(e, n) {
                  t.resolveMessageEvent(e, g.default.MessengerEvents.RemoveMessage, n)
              }), this.signalling.addEventListener(f.MsgEvent.isRead, function(e, t) {
                  c.Messenger.getInstance()._dispatchEvent(g.default.MessengerEvents.Read, {
                      conversation: e.object.conversation,
                      seq: e.object.seq,
                      initiator: Number(e.initiator),
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      requestUuid: t
                  }, t)
              }), this.signalling.addEventListener(f.MsgEvent.onTyping, function(e, t) {
                  c.Messenger.getInstance()._dispatchEvent(g.default.MessengerEvents.Typing, {
                      conversation: e.object.conversation,
                      initiator: Number(e.initiator),
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      requestUuid: t
                  }, t)
              }), this.signalling.addEventListener(f.MsgEvent.onRetransmitEvents, function(e, t) {
                  c.Messenger.getInstance()._dispatchEvent(g.default.MessengerEvents.RetransmitEvents, {
                      events: [e.object && e.object.event ? -1 == e.object.event.indexOf("Message") && e.object.payload ? {
                          conversation: l.Conversation._createFromBus(e.object.payload.object, e.object.payload.seq),
                          initiator: Number(e.object.payload.initiator),
                          seq: e.object.payload.seq,
                          messengerAction: g.default.MessengerAction[e.object.payload.on_incoming_event],
                          timestamp: "number" == typeof e.object.payload.timestamp ? 1e3 * e.object.payload.timestamp : void 0
                      } : {
                          message: u.Message._createFromBus(e.object.payload.object, Number(e.object.payload.initiator)),
                          initiator: Number(e.object.payload.initiator),
                          seq: e.object.payload.seq,
                          timestamp: "number" == typeof e.object.payload.timestamp ? 1e3 * e.object.payload.timestamp : void 0,
                          messengerAction: g.default.MessengerAction[e.object.payload.on_incoming_event]
                      } : void 0],
                      initiator: Number(e.initiator),
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      requestUuid: t
                  }, t)
              })
          }
          return i(e, [{
              key: "resolveEvent",
              value: function(e, t, n) {
                  var r = l.Conversation._createFromBus(e.object, e.seq);
                  void 0 !== r && r.updateSeq(e.seq), c.Messenger.getInstance()._dispatchEvent(t, {
                      conversation: r,
                      initiator: Number(e.initiator),
                      seq: e.seq,
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      timestamp: "number" == typeof e.timestamp ? 1e3 * e.timestamp : void 0,
                      requestUuid: n
                  }, n)
              }
          }, {
              key: "resolveMessageEvent",
              value: function(e, t, n) {
                  var r = u.Message._createFromBus(e.object, Number(e.initiator));
                  c.Messenger.getInstance()._dispatchEvent(t, {
                      message: r,
                      initiator: Number(e.initiator),
                      seq: e.seq,
                      messengerAction: g.default.MessengerAction[e.on_incoming_event],
                      timestamp: "number" == typeof e.timestamp ? 1e3 * e.timestamp : void 0
                  }, n)
              }
          }, {
              key: "createConversation",
              value: function(e, t, n, r, i, o) {
                  var a = this;
                  return new Promise(function(s, u) {
                      var d = a.signalling.sendWsMessage(v.MsgAction.createConversation, new l.Conversation({
                          participants: e,
                          title: t,
                          direct: n,
                          publicJoin: r,
                          customData: o,
                          uberConversation: i
                      })._getCreatePayload());
                      c.Messenger.getInstance()._registerPromise(d, s, u)
                  })
              }
          }, {
              key: "editConversation",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      var i = void 0,
                          o = function e(t) {
                              t.requestUuid === i && (clearTimeout(s), c.Messenger.getInstance().off(g.default.MessengerEvents.EditConversation, e), c.Messenger.getInstance().off(g.default.MessengerEvents.Error, a), n(t))
                          },
                          a = function t(n) {
                              n.requestUuid === i && (clearTimeout(s), c.Messenger.getInstance().off(g.default.MessengerEvents.EditConversation, o), c.Messenger.getInstance().off(g.default.MessengerEvents.Error, t), e._revertChanges(), r(n))
                          },
                          s = setTimeout(function() {
                              c.Messenger.getInstance().off(g.default.MessengerEvents.EditConversation, o), c.Messenger.getInstance().off(g.default.MessengerEvents.Error, a), c.Messenger.getInstance().reject(g.default.MessengerError.Error_0, g.default.MessengerAction.editConversation).catch(r)
                          }, c.Messenger.rejectTimeout);
                      c.Messenger.getInstance().on(g.default.MessengerEvents.EditConversation, o), c.Messenger.getInstance().on(g.default.MessengerEvents.Error, a), i = t.signalling.sendWsMessage(v.MsgAction.editConversation, e._getEditPayload())
                  })
              }
          }, {
              key: "getConversation",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      var i = t.signalling.sendWsMessage(v.MsgAction.getConversation, {
                          uuid: e
                      });
                      c.Messenger.getInstance()._registerPromise(i, n, r)
                  })
              }
          }, {
              key: "getConversations",
              value: function(e) {
                  if (!Array.isArray(e)) return c.Messenger.getInstance().reject(g.default.MessengerError.Error_0, g.default.MessengerAction.getConversations);
                  var t = void 0,
                      n = Promise.all(e.map(function(e) {
                          return new Promise(function(n, r) {
                              var i = function r(i) {
                                      i.requestUuid === t && i.conversation.uuid === e && (clearTimeout(a), c.Messenger.getInstance().off(g.default.MessengerEvents.GetConversation, r), c.Messenger.getInstance().off(g.default.MessengerEvents.Error, o), n(i))
                                  },
                                  o = function e(n) {
                                      n.requestUuid === t && (clearTimeout(a), c.Messenger.getInstance().off(g.default.MessengerEvents.GetConversation, i), c.Messenger.getInstance().off(g.default.MessengerEvents.Error, e), r(n))
                                  },
                                  a = setTimeout(function() {
                                      c.Messenger.getInstance().off(g.default.MessengerEvents.GetConversation, i), c.Messenger.getInstance().off(g.default.MessengerEvents.Error, o), c.Messenger.getInstance().reject(g.default.MessengerError.Error_0, g.default.MessengerAction.getConversation).catch(r)
                                  }, c.Messenger.rejectTimeout);
                              c.Messenger.getInstance().on(g.default.MessengerEvents.GetConversation, i), c.Messenger.getInstance().on(g.default.MessengerEvents.Error, o)
                          })
                      }));
                  return t = this.signalling.sendWsMessage(v.MsgAction.getConversations, {
                      uuid: e
                  }), n
              }
          }, {
              key: "getPublicConversations",
              value: function() {
                  var e = this;
                  return new Promise(function(t, n) {
                      var r = e.signalling.sendWsMessage(v.MsgAction.getPublicConversations, {});
                      c.Messenger.getInstance()._registerPromise(r, t, n)
                  })
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "ConversationManager"
              }
          }], [{
              key: "get",
              value: function() {
                  return e.instance = e.instance || new e, e.instance
              }
          }, {
              key: "deserialize",
              value: function(e) {
                  return l.Conversation.createFromCache(e)
              }
          }, {
              key: "serialize",
              value: function(e) {
                  return e.toCache()
              }
          }, {
              key: "extractUserName",
              value: function(e) {
                  if (-1 === e.indexOf("@")) return e;
                  var t = e.split("@");
                  return t[1] = t[1].split(".").splice(0, 2).join("."), t.join("@")
              }
          }]), e
      }();
  a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "resolveEvent", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "resolveMessageEvent", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "createConversation", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "editConversation", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "getConversation", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "getConversations", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h.prototype, "getPublicConversations", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h, "get", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h, "deserialize", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h, "serialize", null), a([d.LogManager.d_trace(d.LogCategory.MESSAGING)], h, "extractUserName", null), t.default = h
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  }), t.MESSAGING_ERR_1 = "Error - use Client.getIM()", t.MESSAGING_ERR_2 = "Error - use ConversationManager.get()"
}, function(e, t, n) {
  "use strict";

  function r() {
      return o.Client.getInstance()
  }

  function i() {
      if (!a.Authenticator.get().authorized()) throw new Error("NOT_AUTHORIZED");
      return s.default.Messenger.getInstance()
  }
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(1);
  n(66);
  var a = n(11),
      s = n(19),
      c = n(19);
  t.Messaging = c.Messaging;
  var l = n(14);
  t.Events = l.Events;
  var u = n(5);
  t.CallEvents = u.CallEvents;
  var d = n(39);
  t.Endpoint = d.Endpoint;
  var g = n(30);
  t.EndpointEvents = g.EndpointEvents;
  var f = n(28);
  t.OperatorACDStatuses = f.OperatorACDStatuses;
  var p = n(0);
  t.LogCategory = p.LogCategory, t.LogLevel = p.LogLevel, t.ClientState = p.ClientState,
      function(e) {
          for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
      }(n(4)), t.getInstance = r, t.version = o.Client.getInstance().version, t.getMessenger = i
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(21),
      a = n(0),
      s = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "FF"
              }
          }], [{
              key: "attachStream",
              value: function(e, t) {
                  void 0 === t.srcObject ? t.mozSrcObject = e : t.srcObject = e, t.load(), t.play()
              }
          }, {
              key: "detachStream",
              value: function(e) {
                  void 0 === e.srcObject ? e.mozSrcObject = null : e.srcObject = null, e.load(), e.src = ""
              }
          }, {
              key: "screenSharingSupported",
              value: function() {
                  return new Promise(function(e, t) {
                      if ("https:" != window.location.protocol) return void e(!1);
                      e(!0)
                  })
              }
          }, {
              key: "getScreenMedia",
              value: function() {
                  var e = {
                      audio: !1,
                      video: {
                          mediaSource: "window"
                      }
                  };
                  return a.LogManager.get().writeMessage(a.LogCategory.USERMEDIA, "[constraints]", a.LogLevel.TRACE, JSON.stringify(e)), navigator.mediaDevices.getUserMedia(e)
              }
          }, {
              key: "getRTCStats",
              value: function(t) {
                  return new Promise(function(n, r) {
                      t.getStats(null).then(function(t) {
                          var r = [];
                          t.forEach(function(e) {
                              "inbound-rtp" != e.type && "outbound-rtp" != e.type || r.push(e)
                          }), n({
                              raw: r,
                              formatted: e.prepareRTCStats(t)
                          })
                      }).catch(r)
                  })
              }
          }, {
              key: "prepareRTCStats",
              value: function(e) {
                  var t = [];
                  return e.forEach(function(e) {
                      "outbound-rtp" === e.type || e.isRemote ? t.push(Object.assign(e, {
                          framesPerSecond: e.framesPerSecond ? e.framesPerSecond : e.framerateMean,
                          encoderBitrate: e.bitrateMean
                      })) : t.push(e)
                  }), t
              }
          }, {
              key: "getUserMedia",
              value: function(e) {
                  return navigator.mediaDevices.getUserMedia(e)
              }
          }, {
              key: "getDTMFSender",
              value: function(e, t) {
                  var n = /Firefox\/([0-9\.]+)(?:\s|$)/,
                      r = navigator.userAgent;
                  if (n.test(r)) {
                      if (+n.exec(r)[1].split(".")[0] >= 53) {
                          var i = e.getSenders().map(function(e) {
                              if (e.track && "audio" === e.track.kind && e.dtmf) return e.dtmf
                          });
                          if (i.length > 0) return i[0]
                      }
                  }
                  return new o.SignalingDTMFSender(t)
              }
          }]), e
      }();
  t.FF = s
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(21),
      a = n(1),
      s = n(0),
      c = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "Webkit"
              }
          }], [{
              key: "attachStream",
              value: function(e, t) {
                  try {
                      if (t.srcObject = e, t.load(), t instanceof HTMLVideoElement) t.play().catch(function(e) {});
                      else {
                          t.play().catch(function(e) {});
                          var n = a.Client.getInstance()._defaultSinkId;
                          null != n && t.setSinkId(n)
                      }
                  } catch (e) {
                      s.LogManager.get().writeMessage(s.LogCategory.USERMEDIA, "Webkit: ", s.LogLevel.WARNING, JSON.stringify(e))
                  }
              }
          }, {
              key: "detachStream",
              value: function(e) {
                  if (e.srcObject = null, e instanceof HTMLVideoElement) {
                      var t = e.pause();
                      void 0 !== t && t.catch(function(e) {})
                  } else e.pause();
                  e.src = ""
              }
          }, {
              key: "getDTMFSender",
              value: function(e, t) {
                  if (!e.createDTMFSender) return new o.SignalingDTMFSender(t);
                  var n = [];
                  return e.getLocalStreams().forEach(function(e) {
                      e.getAudioTracks().forEach(function(e) {
                          n.push(e)
                      })
                  }), n.length ? e.createDTMFSender(n[0]) : void 0
              }
          }, {
              key: "getUserMedia",
              value: function(e) {
                  return navigator.mediaDevices.getUserMedia(e)
              }
          }, {
              key: "screenSharingSupported",
              value: function() {
                  return new Promise(function(e, t) {
                      if (navigator.getDisplayMedia) e(!0);
                      else if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) e(!0);
                      else {
                          var n = function t(n) {
                              n.origin === window.location.origin && "VoximplantWebsdkExtensionLoaded" === n.data && (window.removeEventListener("message", t), clearTimeout(r), e(!0))
                          };
                          window.addEventListener("message", n), window.postMessage("VoximplantWebsdkCheckExtension", "*");
                          var r = setTimeout(function() {
                              window.removeEventListener("message", n), e(!1)
                          }, 800)
                      }
                  })
              }
          }, {
              key: "getScreenMedia",
              value: function() {
                  return navigator.getDisplayMedia ? navigator.getDisplayMedia({
                      video: !0
                  }) : navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia ? navigator.mediaDevices.getDisplayMedia({
                      video: !0
                  }) : new Promise(function(e, t) {
                      window.postMessage("voximplantWebsdkGetSourceId", "*");
                      var n = function n(r) {
                          if (r.data && r.origin === window.location.origin && r.data.result) {
                              if ("err" === r.data.result) return t(new Error(r.data.reason));
                              if ("ok" === r.data.result && void 0 !== r.data.sourceId) {
                                  window.removeEventListener("message", n);
                                  var i = {
                                      audio: !1,
                                      video: {
                                          mandatory: {
                                              chromeMediaSource: "desktop",
                                              maxWidth: screen.width > 1920 ? screen.width : 1920,
                                              maxHeight: screen.height > 1080 ? screen.height : 1080,
                                              chromeMediaSourceId: r.data.sourceId
                                          },
                                          optional: [{
                                              googTemporalLayeredScreencast: !0
                                          }]
                                      }
                                  };
                                  s.LogManager.get().writeMessage(s.LogCategory.USERMEDIA, "[constraints]", s.LogLevel.INFO, JSON.stringify(i)), navigator.mediaDevices.getUserMedia(i).then(function(t) {
                                      e(t)
                                  }, function(e) {
                                      t(e)
                                  })
                              }
                          }
                      };
                      window.addEventListener("message", n)
                  })
              }
          }, {
              key: "getRTCStats",
              value: function(t) {
                  return new Promise(function(n, r) {
                      var i = [];
                      t.getStats(null).then(function(t) {
                          t.forEach(function(e) {
                              "outbound-rtp" != e.type && "inbound-rtp" != e.type || i.push(e)
                          }), n({
                              raw: i,
                              formatted: e.prepareRTCStats(t)
                          })
                      }).catch(r)
                  })
              }
          }, {
              key: "prepareRTCStats",
              value: function(e) {
                  var t = [];
                  return e.forEach(function(e) {
                      "inbound-rtp" === e.type && e.isRemote ? t.push(Object.assign(e, {
                          type: "remote-inbound-rtp"
                      })) : "outbound-rtp" === e.type && e.isRemote ? t.push(Object.assign(e, {
                          type: "remote-outbound-rtp"
                      })) : t.push(e)
                  }), t
              }
          }]), e
      }();
  t.Webkit = c
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      c = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var l, u = n(22),
      d = n(7),
      g = n(8),
      f = n(0),
      p = n(2),
      v = n(6),
      h = n(3),
      m = n(40),
      y = n(5),
      C = n(17),
      S = n(10),
      _ = n(16),
      E = n(1),
      L = n(32),
      M = n(4),
      b = n(23),
      R = n(31);
  ! function(e) {
      e[e.offer = "offer"] = "offer", e[e.answer = "answer"] = "answer", e[e.pranswer = "pranswer"] = "pranswer", e[e.rollback = "rollback"] = "rollback"
  }(l || (l = {}));
  var T;
  ! function(e) {
      e[e.controlling = "controlling"] = "controlling", e[e.controlled = "controlled"] = "controlled"
  }(T || (T = {}));
  var k = function(e) {
      function t(e, n, o, a) {
          r(this, t);
          var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, o));
          s.iceTimer = null, s.needTransportRestart = !0, s.ICE_TIMEOUT = 2e4, s.RENEGOTIATION_TIMEOUT = 15e3, s.canDeliverStats = !0, s._canReInvite = function() {
              return "connected" === s.impl.iceConnectionState || "completed" === s.impl.iceConnectionState
          }, s._needIceRestart = !1;
          var c = g.PCFactory.get().iceConfig,
              l = c;
          return void 0 !== l && null !== l || (l = {
              gatherPolicy: "all",
              iceServers: []
          }), a && (l.iceServers = a), l.bundlePolicy = "max-compat", "chrome" === d.default.getWSVendor() && E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.unifiedPlan && (l.sdpSemantics = "unified-plan"), s._createImpl(l), s
      }
      return o(t, e), a(t, [{
          key: "_createImpl",
          value: function(e) {
              var t = this;
              if (this.mode === u.PeerConnectionMode.CONFERENCE && "chrome" === d.default.getWSVendor()) {
                  var n = {
                          mandatory: {},
                          optional: [{
                              googHighStartBitrate: !0
                          }, {
                              googHighBitrate: !0
                          }, {
                              googSkipEncodingUnusedStreams: !0
                          }, {
                              googScreencastMinBitrate: 400
                          }, {
                              googVeryHighBitrate: !0
                          }, {
                              googCpuOveruseDetection: !0
                          }, {
                              googCpuOveruseEncodeUsage: !0
                          }, {
                              googCpuUnderuseThreshold: 55
                          }, {
                              googCpuOveruseThreshold: 85
                          }]
                      },
                      r = RTCPeerConnection;
                  this.impl = new r(e, n)
              } else this.impl = new RTCPeerConnection(e);
              if (this.impl.getTransceivers && "firefox" === d.default.getWSVendor() && (g.PCFactory.hasTransceivers = !0), void 0 !== this.impl.ontrack ? this.impl.ontrack = function(e) {
                      return t.onAddTrack(e)
                  } : void 0 !== this.impl.onaddtrack ? this.impl.onaddtrack = function(e) {
                      return t.onAddTrack(e)
                  } : this.impl.onaddstream = function(e) {
                      return t.onAddStream(e)
                  }, this.impl.onicecandidate = function(e) {
                      t.onICECandidate(e.candidate)
                  }, this.impl.oniceconnectionstatechange = function(e) {
                      "completed" !== t.impl.iceConnectionState && "connected" !== t.impl.iceConnectionState || (t.iceTimer && clearTimeout(t.iceTimer), t.iceTimer = null, t.reInviteQ && t.reInviteQ.runNext()), "failed" === t.impl.iceConnectionState && (t.renegotiationInProgress = !1, t._runReinvite(!0))
                  }, this.rtpSenders = [], this.renegotiationInProgress = !1, this.impl.onnegotiationneeded = function(e) {
                      return t.onRenegotiation()
                  }, this.impl.onsignalingstatechange = function(e) {
                      return t.onSignalingStateChange()
                  }, this.impl.oniceconnectionstatechange = function(e) {
                      return t.onConnectionChange()
                  }, this.iceRole = T.controlling, this._remoteStreams = [], this.banReinviteAnswer = !1, this._call = v.CallManager.get().calls[this.id], void 0 !== this._call ? this.onHold = !this._call.active() : this.onHold = !1, this.rtcCollectingCycle = setInterval(function() {
                      t.getPCStats()
                  }, v.CallManager.get().rtcStatsInquiryInterval), void 0 !== this._call) {
                  var i = this._call.headers()[S.Constants.CALLSTATSIOID_HEADER];
                  void 0 === i && (i = this._call.id()), C.CallstatsIo.get().addNewFabric(this.impl, this._call.number(), this.videoEnabled ? C.CallstatsIoFabricUsage.multiplex : C.CallstatsIoFabricUsage.audio, i)
              }
              this.needTransportRestart = !1, "_default" !== this.id && v.CallManager.get().calls[this.id] && (this.reInviteQ = new L.ReInviteQ(v.CallManager.get().calls[this.id], this._canReInvite))
          }
      }, {
          key: "onSignalingStateChange",
          value: function() {
              this.logger.info("Signal state changed to " + this.impl.signalingState + " for PC: " + this.id), this.impl.signalingState
          }
      }, {
          key: "getPCStats",
          value: function() {
              var e = this;
              d.default.getRTCStats(this.impl).then(function(t) {
                  return v.CallManager.get().callStats.sendStatistics(e._call, t)
              })
          }
      }, {
          key: "onConnectionChange",
          value: function() {
              "completed" === this.impl.iceConnectionState && void 0 !== this._call && this._call.dispatchEvent({
                  name: "ICECompleted",
                  call: this._call
              }), "completed" !== this.impl.iceConnectionState && "connected" !== this.impl.iceConnectionState || (this.iceTimer && clearTimeout(this.iceTimer), this.iceTimer = null, this.reInviteQ && this.reInviteQ.runNext()), R.CallStatsAnalyzer.get().checkICEConnection(this._call, this.impl.iceConnectionState)
          }
      }, {
          key: "onRenegotiation",
          value: function() {
              if (void 0 !== this.impl) {
                  if ("disconnected" === this.impl.connectionState || "failed" === this.impl.connectionState) return void this.logger.info("Renegotiation requested on closed PeerConnection");
                  if (null === this.impl.localDescription) return void this.logger.info("Renegotiation needed, but no local SD. Skipping");
                  if ("connected" !== this.impl.iceConnectionState && "completed" !== this.impl.iceConnectionState) return this.logger.info("Renegotiation requested while ice state is " + this.impl.iceConnectionState + ". Postponing"), void setTimeout(this.onRenegotiation, 100);
                  if (this.renegotiationInProgress) return void this.logger.info("Renegotiation in progress. Queueing");
                  this.logger.info("Renegotiation started"), this._runReinvite()
              }
          }
      }, {
          key: "_getLocalOfferRegular",
          value: function() {
              var e = this;
              return this.iceRole = T.controlling, new Promise(function(t, n) {
                  var r = e.getReceiveOptions();
                  e.impl.createOffer(r).then(function(t) {
                      e.logger.info("_getLocalOfferRegular(), created local SDP: \n" + t.sdp);
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), n = _.SDPMuggle.removeDoublePT(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), e.codecRearrange(n)
                  }).then(function(t) {
                      return e.srcLocalSDP = t.sdp, e.logger.info("_getLocalOfferRegular(), set local SDP: \n" + t.sdp), e.impl.setLocalDescription(t)
                  }).then(function() {
                      t(e.impl.localDescription)
                  }).catch(function(e) {
                      n(e)
                  })
              })
          }
      }, {
          key: "getReceiveOptions",
          value: function() {
              return {
                  offerToReceiveAudio: !this.onHold,
                  offerToReceiveVideo: this.videoEnabled.receiveVideo && !this.onHold
              }
          }
      }, {
          key: "updateHoldState",
          value: function() {
              var e = this;
              this.impl.getLocalStreams().forEach(function(t) {
                  t.getTracks().forEach(function(t) {
                      t.enabled = !e.onHold
                  })
              }), this.impl.getRemoteStreams().forEach(function(t) {
                  t.getTracks().forEach(function(t) {
                      t.enabled = !e.onHold
                  })
              })
          }
      }, {
          key: "onICECandidate",
          value: function(e) {
              e && null !== e ? this.sendLocalCandidateToPeer("a=" + e.candidate, e.sdpMLineIndex) : this.logger.info("End of candidates")
          }
      }, {
          key: "onAddTrack",
          value: function(e) {
              this._call && b.EndpointManager.get().addTrack(this._call, e.track)
          }
      }, {
          key: "onAddStream",
          value: function(e) {
              this._call && b.EndpointManager.get().addStream(this._call, e.stream)
          }
      }, {
          key: "_processRemoteAnswer",
          value: function(e, t) {
              var n = this;
              if (this._pendingOffer) return new Promise(function(r, i) {
                  n.logger.info("_processRemoteAnswer(), set local SDP: \n" + n._pendingOffer.sdp), n.impl.setLocalDescription(n._pendingOffer).then(function() {
                      r(n._processRemoteAnswer(e, t))
                  }), n._pendingOffer = void 0
              });
              if (0 === t.length && this._call) return this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              });
              if (this.iceTimer = setTimeout(function() {
                      n._call.notifyICETimeout()
                  }, this.ICE_TIMEOUT), this.pendingEvent = [e, t], null === this.impl.remoteDescription || "" == this.impl.remoteDescription.sdp) {
                  var r = {
                      sdp: t,
                      type: l.answer
                  };
                  return this.srcRemoteSDP = t, r = _.SDPMuggle.removeTIAS(r), this.logger.info("_processRemoteAnswer(), set remote SDP: \n" + r.sdp), this.impl.setRemoteDescription(r).then(function(e) {
                      n._needIceRestart && n._runReinvite(!0)
                  })
              }
          }
      }, {
          key: "_getLocalOffer",
          value: function() {
              return "firefox" === d.default.getWSVendor() && this.impl.remoteDescription && this.impl.remoteDescription.sdp && -1 === this.impl.remoteDescription.sdp.indexOf("VIMS") ? this._getLocalOfferFF() : this._getLocalOfferRegular()
          }
      }, {
          key: "_getLocalOfferFF",
          value: function() {
              var e = this;
              return this.iceRole = T.controlling, new Promise(function(t, n) {
                  var r = e.getReceiveOptions();
                  e.impl.createOffer(r).then(function(t) {
                      e.logger.info("_getLocalOfferFF(), created local SDP: \n" + t.sdp);
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = _.SDPMuggle.removeDoublePT(n), n = g.PCFactory.get().addBandwidthParams(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), e.codecRearrange(n)
                  }).then(function(n) {
                      e.srcLocalSDP = n.sdp, e._pendingOffer = n, t(n)
                  }).catch(function(e) {
                      n(e)
                  })
              })
          }
      }, {
          key: "_getLocalAnswer",
          value: function() {
              var e = this;
              return this.iceRole = T.controlled, new Promise(function(t, n) {
                  var r = {
                      mandatory: e.getReceiveOptions()
                  };
                  e.impl.createAnswer(r).then(function(t) {
                      e.logger.info("_getLocalAnswer(), created local SDP: \n" + t.sdp);
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), n = _.SDPMuggle.removeDoublePT(n), n = _.SDPMuggle.fixVideoRecieve(n, e._call.settings.videoDirections.receiveVideo), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), e.codecRearrange(n)
                  }).then(function(t) {
                      return e.srcLocalSDP = t.sdp, e.logger.info("_getLocalAnswer(), set local SDP: \n" + t.sdp), e.impl.setLocalDescription(t)
                  }).then(function() {
                      t({
                          type: l.answer,
                          sdp: e.impl.localDescription.sdp
                      })
                  }).catch(function(e) {
                      n(e)
                  })
              })
          }
      }, {
          key: "_processRemoteOffer",
          value: function(e) {
              var t = this;
              return 0 === e.length && this._call ? (this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              })) : (this.iceRole = T.controlled, new Promise(function(n, r) {
                  var i = new RTCSessionDescription({
                      sdp: e,
                      type: l.offer
                  });
                  E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (i = _.SDPMuggle.removeTransportCC(i)), t.srcRemoteSDP = e, i = _.SDPMuggle.removeTIAS(i), i = _.SDPMuggle.fixFFMIDBug(i), t.logger.info("_processRemoteOffer(), set remote SDP: \n" + i.sdp), t.impl.setRemoteDescription(i).then(function() {
                      var e = {
                          mandatory: t.getReceiveOptions()
                      };
                      return t.impl.createAnswer(e)
                  }).then(function(e) {
                      return t.logger.info("_processRemoteOffer(), created local SDP: \n" + e.sdp), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (e = _.SDPMuggle.removeTransportCC(e)), e = _.SDPMuggle.removeDoublePT(e), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (e = _.SDPMuggle.addXAS(e)), t.codecRearrange(e)
                  }).then(function(e) {
                      return t.srcLocalSDP = e.sdp, t.logger.info("_processRemoteOffer(), set local SDP: \n" + e.sdp), t.impl.setLocalDescription(e)
                  }).then(function() {
                      n(t.impl.localDescription.sdp)
                  }).catch(function(e) {
                      r(e)
                  })
              }))
          }
      }, {
          key: "_setRemoteDescription",
          value: function(e) {
              if (0 === e.length && this._call) return this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              });
              var t = new RTCSessionDescription({
                  sdp: e,
                  type: l.offer
              });
              return t = _.SDPMuggle.removeTIAS(t), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (t = _.SDPMuggle.removeTransportCC(t)), this.srcRemoteSDP = e, this.logger.info("_setRemoteDescription(), set remote SDP: \n" + t.sdp), this.impl.setRemoteDescription(t)
          }
      }, {
          key: "_handleReinvite",
          value: function(e, t) {
              var n = this;
              return 0 === t.length && this._call ? (this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              })) : new Promise(function(r, i) {
                  if (n.banReinviteAnswer && i(new Error), !1 === n.renegotiationInProgress) {
                      n.renegotiationInProgress = !0;
                      var o = {
                          sdp: t,
                          type: l.offer
                      };
                      E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (o = _.SDPMuggle.removeTransportCC(o)), n.srcRemoteSDP = t, o = _.SDPMuggle.removeTIAS(o), n.logger.info("_handleReinvite(), set remote SDP: \n" + o.sdp), n.impl.setRemoteDescription(o).then(function() {
                          var t = {
                              mandatory: n.getReceiveOptions()
                          };
                          n.impl.createAnswer(t).then(function(t) {
                              n.logger.info("_handleReinvite(), created local SDP: \n" + t.sdp);
                              var o = {
                                  type: t.type,
                                  sdp: t.sdp
                              };
                              o = _.SDPMuggle.fixVideoRecieve(o, n.videoEnabled.receiveVideo), o = _.SDPMuggle.removeDoublePT(o), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (o = _.SDPMuggle.removeTransportCC(o)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (o = _.SDPMuggle.addXAS(o)), n.srcLocalSDP = o.sdp;
                              try {
                                  n.logger.info("_handleReinvite(), set local SDP: \n" + o.sdp), n.impl.setLocalDescription(o).then(function() {
                                      var t = {
                                          tracks: n.getTrackKind()
                                      };
                                      p.VoxSignaling.get().callRemoteFunction(h.RemoteFunction.acceptReInvite, n._call.id(), e, n.impl.localDescription.sdp, t), n.renegotiationInProgress = !1, n._call.dispatchEvent({
                                          name: y.CallEvents.Updated,
                                          result: !0,
                                          call: n._call
                                      }), n.updateHoldState(), setTimeout(function(e) {
                                          return n._fixTransreceiver()
                                      }, 0), r()
                                  })
                              } catch (e) {
                                  n.renegotiationInProgress = !1, setTimeout(function(e) {
                                      return n._fixTransreceiver()
                                  }, 0), i(e)
                              }
                          })
                      })
                  } else if (!0 === n.renegotiationInProgress) {
                      var a = {
                          sdp: t,
                          type: l.answer
                      };
                      n.renegotiationInProgress = !1, E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (a = _.SDPMuggle.removeTransportCC(a)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (a = _.SDPMuggle.addXAS(a)), n.srcRemoteSDP = t, a = _.SDPMuggle.removeTIAS(a), n.logger.info("_handleReinvite(), set local SDP: \n" + n.pendingOffer.sdp), n.impl.setLocalDescription(n.pendingOffer).then(function() {
                          try {
                              n.logger.info("_handleReinvite(), set remote SDP: \n" + a.sdp), n.impl.setRemoteDescription(a).then(function() {
                                  n._call.dispatchEvent({
                                      name: y.CallEvents.Updated,
                                      result: !0,
                                      call: n._call
                                  }), n.updateHoldState(), setTimeout(function(e) {
                                      return n._fixTransreceiver()
                                  }, 0), r()
                              })
                          } catch (e) {
                              n._call.dispatchEvent({
                                  name: y.CallEvents.Updated,
                                  result: !1,
                                  call: n._call
                              }), n.renegotiationInProgress = !1, n.logger.error(JSON.stringify(e)), setTimeout(function(e) {
                                  return n._fixTransreceiver()
                              }, 0), i(e)
                          }
                          clearTimeout(n.renegotiationTimer)
                      })
                  } else i(new Error("Universe was broken!"))
              })
          }
      }, {
          key: "_close",
          value: function() {
              var e = this;
              clearInterval(this.rtcCollectingCycle), this.impl.onnegotiationneeded = null;
              E.Client.getInstance().config();
              this.impl.removeTrack ? (this.rtpSenders.forEach(function(t) {
                  e.impl.removeTrack(t)
              }), M.default.StreamManager.get().remCallStream(this._call)) : (M.default.StreamManager.get().remCallStream(this._call), this.impl.getLocalStreams().forEach(function(t) {
                  e.impl.removeStream(t)
              })), this.impl.close(), void 0 !== this._call && C.CallstatsIo.get().sendFabricEvent(this.impl, C.CallstatsIoFabricEvent.fabricTerminated, this._call.id()), this._localStream = null, this._remoteStreams = null
          }
      }, {
          key: "_addRemoteCandidate",
          value: function(e, t) {
              var n = this;
              return new Promise(function(r, i) {
                  try {
                      n.impl.addIceCandidate(new RTCIceCandidate({
                          candidate: e.substring(2),
                          sdpMLineIndex: t
                      })).then(function() {
                          r()
                      }).catch(function() {
                          r()
                      })
                  } catch (e) {
                      r()
                  }
              })
          }
      }, {
          key: "setConfiguration",
          value: function(e) {
              var t = this;
              this.impl && setTimeout(function() {
                  if (t.srcRemoteSDP && -1 === t.srcRemoteSDP.indexOf("VIMS"))
                      if (t.impl && t.impl.setConfiguration) t.impl.setConfiguration(e), t.renegotiationInProgress = !1, t._runReinvite(!0);
                      else if (t._pendingOffer) {
                      var n = [];
                      t.impl.getTransceivers().map(function(e) {
                          e.sender.track && n.push(e.sender.track)
                      }), t._createImpl(e), n.forEach(function(e) {
                          t.impl.addTrack(e, new MediaStream([e]))
                      }), t.impl.createOffer().then(function(e) {
                          return t.logger.info("setConfiguration(), created local SDP: \n" + e.sdp), t._needIceRestart = !0, t.logger.info("setConfiguration(), set local SDP: \n" + t._pendingOffer.sdp), t.impl.setLocalDescription(t._pendingOffer)
                      }).then(function() {
                          t._pendingOffer = void 0
                      }).catch(function(e) {
                          console.error(e)
                      })
                  }
              }, 800)
          }
      }, {
          key: "_fixTransreceiver",
          value: function() {
              this.impl && this.impl.getTransceivers && this.impl.getTransceivers().forEach(function(e) {
                  "inactive" === e.currentDirection && e.receiver.track && !e.sender.track && e.receiver.track.onended && (e.receiver.track.stop(), e.receiver.track.onended(null))
              })
          }
      }, {
          key: "codecRearrange",
          value: function(e) {
              var t = this;
              return new Promise(function(n, r) {
                  var i = v.CallManager.get().calls[t.id];
                  if (void 0 !== i) {
                      var o = new m.CodecSorter(e.sdp),
                          a = o.getUserCodecList();
                      void 0 !== i.rearangeCodecs ? i.rearangeCodecs(a, i.settings.incoming).then(function(t) {
                          o.setUserCodecList(t), n({
                              type: e.type,
                              sdp: o.getSDP()
                          })
                      }, function(e) {
                          t.logger.error(JSON.stringify(e)), r(e)
                      }) : (t.logger.info("No sdp transformer registered"), o.setUserCodecList(a), n({
                          type: e.type,
                          sdp: o.getSDP()
                      }))
                  } else n(e)
              })
          }
      }, {
          key: "_sendDTMF",
          value: function(e, t, n) {
              void 0 !== this.dtmfSender && this.dtmfSender.insertDTMF(e, t, n)
          }
      }, {
          key: "_hold",
          value: function(e) {
              var t = this;
              C.CallstatsIo.get().sendFabricEvent(this.impl, e ? C.CallstatsIoFabricEvent.fabricHold : C.CallstatsIoFabricEvent.fabricResume, this._call.id()), this.onHold = e, setTimeout(function() {
                  t.impl.getTransceivers && "firefox" === d.default.getWSVendor() ? t.impl.getTransceivers().forEach(function(t) {
                      t.direction = e ? "sendonly" : "sendrecv"
                  }) : t.onRenegotiation()
              }, 0)
          }
      }, {
          key: "_getDirections",
          value: function() {
              var e = {};
              return e.local = _.SDPMuggle.detectDirections(this.impl.localDescription.sdp), e.remote = _.SDPMuggle.detectDirections(this.impl.remoteDescription.sdp), e
          }
      }, {
          key: "_getStreamActivity",
          value: function() {
              var e = {};
              return e.local = this.getMediaActivity(this.impl.getLocalStreams()), e.remote = this.getMediaActivity(this.impl.getRemoteStreams()), e
          }
      }, {
          key: "getMediaActivity",
          value: function(e) {
              return e.map(function(e) {
                  return e.getTracks().map(function(e) {
                      return {
                          id: e.id,
                          kind: e.kind,
                          mutted: e.muted,
                          active: e.enabled,
                          label: e.label
                      }
                  })
              })
          }
      }, {
          key: "_hdnFRSPrep",
          value: function() {
              this.banReinviteAnswer = !0
          }
      }, {
          key: "_hdnFRS",
          value: function() {
              this.renegotiationInProgress = !1, this.onRenegotiation()
          }
      }, {
          key: "_traceName",
          value: function() {
              return "WebRTCPC"
          }
      }, {
          key: "hasLocalAudio",
          value: function() {
              return this.impl.getLocalStreams().some(function(e) {
                  return !!e.getAudioTracks().length
              })
          }
      }, {
          key: "hasLocalVideo",
          value: function() {
              var e = this;
              return this.impl.getLocalStreams().some(function(t) {
                  return t.getVideoTracks().some(function(t) {
                      return !e.shareScreenMedia || !e.shareScreenMedia.some(function(e) {
                          return e.getTracks().some(function(e) {
                              return e.id === t.id
                          })
                      })
                  })
              })
          }
      }, {
          key: "enableVideo",
          value: function(e) {
              var t = [];
              this._call && (t = M.default.StreamManager.get()._getScreenSharing(this._call) || []);
              var n = [];
              t.forEach(function(e) {
                  return e.stream.getTracks().forEach(function(e) {
                      return n.push(e.id)
                  })
              }), this.impl.getLocalStreams().forEach(function(t) {
                  t.getVideoTracks().forEach(function(t) {
                      n.some(function(e) {
                          return t.id === e
                      }) || (t.enabled = e)
                  })
              })
          }
      }, {
          key: "getTransceivers",
          value: function() {
              return this.impl.getTransceivers ? this.impl.getTransceivers() : []
          }
      }, {
          key: "getRemoteDescription",
          value: function() {
              return this.impl.remoteDescription && this.impl.remoteDescription.sdp ? this.impl.remoteDescription.sdp : ""
          }
      }, {
          key: "_addCustomMedia",
          value: function(e) {
              var t = this;
              if (e && ("firefox" === d.default.getWSVendor() ? e.getTracks().forEach(function(e) {
                      var n = new MediaStream([e]);
                      t.rtpSenders.push(t.impl.addTrack(e, n)), t.onRenegotiation()
                  }) : this.impl.addStream(e), !this.dtmfSender && this._call)) {
                  var n = d.default.getDTMFSender(this.impl, this._call.id());
                  n && (this.dtmfSender = n)
              }
          }
      }, {
          key: "_removeCustomMedia",
          value: function(e) {
              var t = this;
              if (e)
                  if ("firefox" === d.default.getWSVendor())
                      if (this.impl.getTransceivers) {
                          var n = this.impl.getTransceivers();
                          n.forEach(function(t) {
                              e.getTracks().find(function(e) {
                                  return e.id === t.sender.track.id
                              }) && t.stop()
                          })
                      } else this.impl.getSenders().forEach(function(n) {
                          -1 !== e.getTracks().indexOf(n.track) && t.impl.removeTrack(n)
                      });
              else this.impl.removeStream(e)
          }
      }, {
          key: "_updateCustomMedia",
          value: function(e) {
              var t = this;
              e && "closed" !== this.impl.signalingState && e.getTracks().forEach(function(e) {
                  var n = t.impl.getSenders().find(function(t) {
                      return t.track && t.track.kind === e.kind
                  });
                  n && n.replaceTrack(e)
              })
          }
      }, {
          key: "_fixFFSoundBug",
          value: function() {
              var e = this;
              "firefox" === d.default.getWSVendor() && g.PCFactory.hasTransceivers && setTimeout(function() {
                  if (e.impl.getSenders) {
                      e.impl.getSenders().forEach(function(e) {
                          if (e.replaceTrack) {
                              var t = e.track;
                              e.replaceTrack(t)
                          }
                      })
                  }
              }, 1e3)
          }
      }, {
          key: "getConfiguration",
          value: function() {
              return this.impl ? this.impl.getConfiguration() : null
          }
      }, {
          key: "_runReinvite",
          value: function() {
              var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (!1 === this.renegotiationInProgress) {
                  this.renegotiationInProgress = !0;
                  var n = {};
                  this.impl.getTransceivers && "firefox" === d.default.getWSVendor() || (n = this.getReceiveOptions()), t && (n.iceRestart = !0), this.logger.trace(JSON.stringify(n)), this.updateHoldState(), this.impl.createOffer(n).then(function(t) {
                      return e.logger.info("_runReinvite(), created local SDP: \n" + t.sdp), e.codecRearrange(t)
                  }).then(function(t) {
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), n = _.SDPMuggle.removeDoublePT(n), n = _.SDPMuggle.removeTelephoneEvents(n), n = _.SDPMuggle.fixVideoRecieve(n, e.videoEnabled.receiveVideo), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), n
                  }).then(function(t) {
                      return e.srcLocalSDP = t.sdp, e.pendingOffer = t, t
                  }).then(function() {
                      var t = {
                          tracks: e.getTrackKind()
                      };
                      p.VoxSignaling.get().callRemoteFunction(h.RemoteFunction.reInvite, e._call.id(), {}, e.pendingOffer.sdp, t)
                  }).catch(function(t) {
                      e.logger.error("Error when renegatiation start " + t.message)
                  })
              } else this.logger.error("Another renegatiation in progress")
          }
      }]), t
  }(u.PeerConnection);
  c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_createImpl", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onSignalingStateChange", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getPCStats", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onConnectionChange", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onRenegotiation", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalOfferRegular", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getReceiveOptions", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "updateHoldState", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onICECandidate", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onAddTrack", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onAddStream", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_processRemoteAnswer", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalOffer", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalOfferFF", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalAnswer", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_setRemoteDescription", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_handleReinvite", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_close", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_addRemoteCandidate", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "setConfiguration", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "codecRearrange", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_sendDTMF", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_hold", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getStreamActivity", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getMediaActivity", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_hdnFRSPrep", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_hdnFRS", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "hasLocalAudio", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "hasLocalVideo", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "enableVideo", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_addCustomMedia", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_removeCustomMedia", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_updateCustomMedia", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_fixFFSoundBug", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getConfiguration", null), t.WebRTCPC = k
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var r = n(35);
  t.AudioDeviceManager = r.AudioDeviceManager;
  var i = n(36);
  t.CameraManager = i.CameraManager;
  var o = n(29);
  t.StreamManager = o.StreamManager;
  var a = n(51);
  t.IOSCacheManager = a.IOSCacheManager
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(0),
      a = function() {
          function e() {
              if (r(this, e), this._cachedChecksum = 0, this._lastCameraParams = {}, this._lastAudioParams = {}, void 0 !== e.instance) throw new Error("Error - use StreamManager.get()")
          }
          return i(e, [{
              key: "getStream",
              value: function(e) {
                  var t = this;
                  return new Promise(function(n, r) {
                      if (t._localMedia && t._localMedia.active && t._cachedChecksum === t.getChecksumm(e)) return void n(t._localMedia);
                      navigator.mediaDevices.getUserMedia(e).then(function(r) {
                          o.LogManager.get().writeMessage(o.LogCategory.USERMEDIA, "IOSCacheManager", o.LogLevel.INFO, "Media access granted"), t._cachedChecksum = t.getChecksumm(e), t._localMedia = r, n(r)
                      }).catch(function(e) {
                          o.LogManager.get().writeMessage(o.LogCategory.USERMEDIA, "IOSCacheManager", o.LogLevel.ERROR, "Media access denied: " + (e ? e.message || e.name || e : "unknown")), r(e)
                      })
                  })
              }
          }, {
              key: "getChecksumm",
              value: function(e) {
                  var t = 0;
                  return e.audio && t++, e.video && t++, t
              }
          }, {
              key: "clear",
              value: function(e) {
                  for (var t in this._callRendererList[e.id()]) this._callRendererList[e.id()].hasOwnProperty(t) && delete this._callRendererList[e.id()][t];
                  delete this._callRendererList[e.id()]
              }
          }, {
              key: "registerMediaRenderer",
              value: function(e, t) {}
          }, {
              key: "diffCameraParams",
              value: function(e) {
                  return this.fastDiffObjects(this._lastCameraParams, e)
              }
          }, {
              key: "diffAudioParams",
              value: function(e) {
                  return this.fastDiffObjects(this._lastAudioParams, e)
              }
          }, {
              key: "fastDiffObjects",
              value: function(e, t) {
                  return Object.keys(e).length === Object.keys(t).length && Object.keys(e).every(function(n) {
                      return e[n] === t[n]
                  })
              }
          }], [{
              key: "get",
              value: function() {
                  return void 0 === e.instance && (e.instance = new e), e.instance
              }
          }]), e
      }();
  t.IOSCacheManager = a
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      c = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var l = n(38),
      u = n(0),
      d = n(16),
      g = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
          }
          return o(t, e), a(t, [{
              key: "getEndpointByTrack",
              value: function(e, t) {
                  var n = this.getRtrackId(e, t.id);
                  return this._getEndpointByTrackId(e, n)
              }
          }, {
              key: "getRtrackId",
              value: function(e, t) {
                  if (void 0 === e.peerConnection) return "";
                  for (var n = e.peerConnection.getTransceivers(), r = 0; r < n.length; r++)
                      if (null !== n[r].mid && n[r].receiver.track.id === t) {
                          var i = d.SDPMuggle.findTrackByMid(e.peerConnection.getRemoteDescription(), n[r].mid);
                          if (i) return i
                      }
              }
          }, {
              key: "getMediaTypeTrack",
              value: function(e, t) {
                  var n = this.getRtrackId(e, t.id);
                  return this._getMediaTypeTrack(e, {
                      id: n,
                      kind: t.kind
                  })
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "TransceiversEndpointManager"
              }
          }]), t
      }(l.AbstractEndpointManager);
  c([u.LogManager.d_trace(u.LogCategory.ENDPOINT)], g.prototype, "getEndpointByTrack", null), c([u.LogManager.d_trace(u.LogCategory.ENDPOINT)], g.prototype, "getMediaTypeTrack", null), t.TransceiversEndpointManager = g
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(38),
      c = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), a(t, [{
              key: "_traceName",
              value: function() {
                  return "PlainEndpointManager"
              }
          }, {
              key: "getEndpointByTrack",
              value: function(e, t) {
                  return this._getEndpointByTrackId(e, t.id)
              }
          }, {
              key: "getMediaTypeTrack",
              value: function(e, t) {
                  return this._getMediaTypeTrack(e, t)
              }
          }]), t
      }(s.AbstractEndpointManager);
  t.PlainEndpointManager = c
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      },
      c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var u = n(12),
      d = n(2),
      g = n(6),
      f = n(0),
      p = n(3),
      v = function(e) {
          function t(e, n, o, a) {
              r(this, t);
              var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, o, a));
              return s.settings.mode = u.CallMode.SERVER, s
          }
          return o(t, e), a(t, [{
              key: "answer",
              value: function(e, n) {
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "answer", this).call(this, e, n);
                  var r = {
                      tracks: this.peerConnection.getTrackKind()
                  };
                  d.VoxSignaling.get().callRemoteFunction(p.RemoteFunction.acceptCall, this.settings.id, g.CallManager.cleanHeaders(n), r)
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "CallExServer"
              }
          }]), t
      }(u.Call);
  l([f.LogManager.d_trace(f.LogCategory.CALLEXSERVER)], v.prototype, "answer", null), t.CallExServer = v
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = function e(t, n, r) {
          null === t && (t = Function.prototype);
          var i = Object.getOwnPropertyDescriptor(t, n);
          if (void 0 === i) {
              var o = Object.getPrototypeOf(t);
              return null === o ? void 0 : e(o, n, r)
          }
          if ("value" in i) return i.value;
          var a = i.get;
          if (void 0 !== a) return a.call(r)
      },
      c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      l = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : c(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var s = e.length - 1; s >= 0; s--)(i = e[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var u = n(12),
      d = n(2),
      g = n(0),
      f = n(3),
      p = n(10),
      v = n(1),
      h = n(4),
      m = n(5),
      y = function(e) {
          function t() {
              return r(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
          }
          return o(t, e), a(t, [{
              key: "answer",
              value: function(e, n, r) {
                  var i = this;
                  s(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "answer", this).call(this, e, n), void 0 !== e && (void 0 !== n && "object" === (void 0 === n ? "undefined" : c(n)) || (n = {}), n[p.Constants.CALL_DATA_HEADER] = e), this._answerHeaders = n;
                  v.Client.getInstance().config();
                  return new Promise(function(e, t) {
                      i._answerPromise = e, "object" === (void 0 === r ? "undefined" : c(r)) && (i.settings.videoDirections = r);
                      var n = function() {
                          h.default.StreamManager.get().getCallStream(i).then(function(e) {
                              i._peerConnection.fastAddCustomMedia(e), i._peerConnection.getLocalAnswer().then(function(e) {
                                  var t = {
                                      tracks: i.peerConnection.getTrackKind()
                                  };
                                  d.VoxSignaling.get().callRemoteFunction(f.RemoteFunction.acceptCall, i.id(), i._answerHeaders, e.sdp, t), i._peerConnection._fixFFSoundBug(), i._answerPromise()
                              }).catch(function() {})
                          }).catch(function(e) {
                              return t(e)
                          })
                      };
                      i._peerConnection ? n() : setTimeout(n, 600)
                  })
              }
          }, {
              key: "setActive",
              value: function(e) {
                  var t = this;
                  return e === this.settings.active ? new Promise(function(e, n) {
                      n({
                          name: m.CallEvents.Updated,
                          result: !1,
                          call: t
                      })
                  }) : (this._setActive(e), this.peerConnection.hold(!e))
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "CallExMedia"
              }
          }]), t
      }(u.Call);
  l([g.LogManager.d_trace(g.LogCategory.CALL)], y.prototype, "answer", null), l([g.LogManager.d_trace(g.LogCategory.CALL)], y.prototype, "setActive", null), t.CallExMedia = y
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      a = function(e, t, n, r) {
          var i, a = arguments.length,
              s = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : o(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (a < 3 ? i(s) : a > 3 ? i(t, n, s) : i(t, n)) || s);
          return a > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var s = n(0),
      c = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "CodecSorterHelpers"
              }
          }], [{
              key: "H264Sorter",
              value: function(e, t) {
                  return t ? new Promise(function(t) {
                      for (var n = 0; n < e.sections.length; n++)
                          if ("video" == e.sections[n].kind.toLowerCase()) {
                              var r = e.sections[n].codec.filter(function(e) {
                                  return -1 != e.toLowerCase().indexOf("h264") && -1 == e.toLowerCase().indexOf("uc")
                              });
                              r.length && (e.sections[n].codec = r)
                          } t(e)
                  }) : new Promise(function(t) {
                      for (var n = 0; n < e.sections.length; n++) "video" == e.sections[n].kind.toLowerCase() && e.sections[n].codec.sort(function(e, t) {
                          return -1 != e.toLowerCase().indexOf("h264") && -1 == e.toLowerCase().indexOf("uc") ? -1 : -1 != t.toLowerCase().indexOf("h264") && -1 == t.toLowerCase().indexOf("uc") ? 1 : 0
                      });
                      t(e)
                  })
              }
          }, {
              key: "VP8Sorter",
              value: function(e, t) {
                  return new Promise(function(t, n) {
                      for (var r = 0; r < e.sections.length; r++) "video" == e.sections[r].kind.toLowerCase() && e.sections[r].codec.sort(function(e, t) {
                          return -1 != e.toLowerCase().indexOf("vp8") ? -1 : -1 != t.toLowerCase().indexOf("vp8") ? 1 : 0
                      });
                      t(e)
                  })
              }
          }]), e
      }();
  a([s.LogManager.d_trace(s.LogCategory.RTC)], c, "H264Sorter", null), a([s.LogManager.d_trace(s.LogCategory.RTC)], c, "VP8Sorter", null), t.CodecSorterHelpers = c
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : e[t] = n, e
  }

  function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var o = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      s = function(e, t, n, r) {
          var i, o = arguments.length,
              s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : a(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
          return o > 3 && s && Object.defineProperty(t, n, s), s
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var c = n(5),
      l = n(6),
      u = n(0),
      d = n(31),
      g = function() {
          function e() {
              i(this, e), this._calls = new WeakMap
          }
          return o(e, [{
              key: "addCall",
              value: function(e) {
                  e && "object" === (void 0 === e ? "undefined" : a(e)) && (this._calls.set(e, {}), d.CallStatsAnalyzer.get().addCall(e))
              }
          }, {
              key: "deleteCall",
              value: function(e) {
                  return e && "object" === (void 0 === e ? "undefined" : a(e)) && this._calls.has(e) && (this._calls.get(e).nextDeliveryTimer && clearTimeout(this._calls.get(e).nextDeliveryTimer), this._calls.delete(e)), d.CallStatsAnalyzer.get().deleteCall(e), Promise.resolve(!0)
              }
          }, {
              key: "sendStatistics",
              value: function(e, t) {
                  var n = this;
                  if (e && "object" === (void 0 === e ? "undefined" : a(e))) {
                      this._calls.has(e) || this.addCall(e);
                      var i = this._calls.get(e);
                      if (!i.nextDeliveryTimer) {
                          var o = t.formatted.filter(function(e) {
                                  return "inbound-rtp" === e.type
                              }),
                              s = t.formatted.filter(function(e) {
                                  return "track" === e.type && o.some(function(t) {
                                      return t.trackId === e.id
                                  })
                              }),
                              u = {
                                  jitterBuffer: s.reduce(function(e, t) {
                                      return Object.assign(e, r({}, t.id, {
                                          delay: t.jitterBufferDelay,
                                          emittedCount: t.jitterBufferEmittedCount
                                      }))
                                  }, {})
                              },
                              g = window.setTimeout(function() {
                                  return n._calls.set(e, {
                                      prevStats: u
                                  })
                              }, l.CallManager.get().rtcStatsCollectionInterval);
                          e.dispatchEvent({
                              name: c.CallEvents.RTCStatsReceived,
                              stats: t.raw
                          }), e.dispatchEvent({
                              name: c.CallEvents.CallStatsReceived,
                              stats: this.getCallStats(e, t.formatted, i.prevStats)
                          }), this._calls.set(e, {
                              nextDeliveryTimer: g
                          })
                      }
                      d.CallStatsAnalyzer.get().analyzeCallStats(e, t.formatted)
                  }
              }
          }, {
              key: "getCallStats",
              value: function(e) {
                  var t = this,
                      n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                      o = n.find(function(e) {
                          return "candidate-pair" === e.type && (e.selected || e.nominated && "succeeded" === e.state)
                      }),
                      a = o && n.find(function(e) {
                          return "local-candidate" === e.type && e.id === o.localCandidateId
                      }),
                      s = o ? o.timestamp : n[0] && n[0].timestamp,
                      c = n.filter(function(e) {
                          return "track" === e.type
                      }),
                      l = n.filter(function(e) {
                          return "codec" === e.type
                      }),
                      u = n.filter(function(e) {
                          return "inbound-rtp" === e.type
                      }),
                      d = u.filter(function(e) {
                          return "audio" === e.mediaType
                      }),
                      g = u.filter(function(e) {
                          return "video" === e.mediaType
                      }),
                      f = n.filter(function(e) {
                          return "outbound-rtp" === e.type
                      }),
                      p = f.filter(function(e) {
                          return "audio" === e.mediaType
                      }),
                      v = f.filter(function(e) {
                          return "video" === e.mediaType
                      }),
                      h = e.getEndpoints(),
                      m = function(e) {
                          var n = e.reduce(function(e, n) {
                              var r = c.find(function(e) {
                                      return e.kind === n.kind && e.trackIdentifier === n.id
                                  }) || {},
                                  o = r && u.find(function(e) {
                                      return e.trackId === r.id
                                  }) || {},
                                  a = i.jitterBuffer && i.jitterBuffer[r.id] && i.jitterBuffer[r.id].delay ? i.jitterBuffer[r.id].delay : 0,
                                  d = i.jitterBuffer && i.jitterBuffer[r.id] && i.jitterBuffer[r.id].emittedCount ? i.jitterBuffer[r.id].emittedCount : 0,
                                  g = {
                                      bytesReceived: (o.bytesReceived || 0) + (e.bytesReceived || 0),
                                      packetsReceived: (o.packetsReceived || 0) + (e.packetsReceived || 0),
                                      packetsLost: (o.packetsLost || 0) + (e.packetsLost || 0),
                                      loss: t.getLoss(o),
                                      jitterBufferMs: void 0 !== r.jitterBufferDelay && void 0 !== r.jitterBufferEmittedCount ? r.jitterBufferEmittedCount - d ? 1e3 * (r.jitterBufferDelay - a) / (r.jitterBufferEmittedCount - d) + (e.jitterBufferMs || 0) : 0 : void 0,
                                      codec: (o && o.codecId && l.find(function(e) {
                                          return e.id === o.codecId
                                      }) || {
                                          mimeType: void 0
                                      }).mimeType,
                                      timestamp: s
                                  };
                              return "video" === n.kind ? Object.assign(g, {
                                  frameHeight: r && r.frameHeight,
                                  frameWidth: r && r.frameWidth
                              }) : g
                          }, {});
                          return e.length > 1 && n.jitterBufferMs && (n.jitterBufferMs = n.jitterBufferMs / e.length), n
                      };
                  return {
                      availableOutgoingBitrate: o && o.availableOutgoingBitrate,
                      localCandidateType: a && a.candidateType,
                      networkType: a && a.networkType,
                      remoteCandidateType: o && (n.find(function(e) {
                          return "remote-candidate" === e.type && e.id === o.remoteCandidateId
                      }) || {}).candidateType,
                      rtt: o && o.currentRoundTripTime,
                      timestamp: s,
                      totalBytesReceived: this.sumByProp(u, "bytesReceived"),
                      totalBytesSent: this.sumByProp(f, "bytesSent"),
                      totalLoss: this.getLoss(u),
                      totalPacketsLost: this.sumByProp(u, "packetsLost"),
                      totalPacketsReceived: this.sumByProp(u, "packetsReceived"),
                      totalPacketsSent: this.sumByProp(f, "packetsSent"),
                      audioBytesReceived: this.sumByProp(d, "bytesReceived"),
                      audioBytesSent: this.sumByProp(p, "bytesSent"),
                      audioLoss: this.getLoss(d),
                      audioPacketsLost: this.sumByProp(d, "packetsLost"),
                      audioPacketsReceived: this.sumByProp(d, "packetsReceived"),
                      audioPacketsSent: this.sumByProp(p, "packetsSent"),
                      videoBytesReceived: this.sumByProp(g, "bytesReceived"),
                      videoBytesSent: this.sumByProp(v, "bytesSent"),
                      videoLoss: this.getLoss(g),
                      videoPacketsLost: this.sumByProp(g, "packetsLost"),
                      videoPacketsReceived: this.sumByProp(g, "packetsReceived"),
                      videoPacketsSent: this.sumByProp(v, "packetsSent"),
                      localAudioStats: p.length ? p.reduce(function(e, t) {
                          return e.set(t.id, {
                              bytesSent: t.bytesSent,
                              packetsSent: t.packetsSent,
                              timestamp: t.timestamp,
                              audioLevel: (c.find(function(e) {
                                  return e.id === t.trackId
                              }) || {
                                  audioLevel: void 0
                              }).audioLevel,
                              codec: (l.find(function(e) {
                                  return e.id === t.codecId
                              }) || {
                                  mimeType: void 0
                              }).mimeType
                          })
                      }, new Map) : new Map,
                      localVideoStats: v.length ? v.reduce(function(e, t) {
                          return e.set(t.id, {
                              bytesSent: t.bytesSent,
                              packetsSent: t.packetsSent,
                              timestamp: t.timestamp,
                              frameHeight: (c.find(function(e) {
                                  return e.id === t.trackId
                              }) || {
                                  frameHeight: void 0
                              }).frameHeight,
                              frameWidth: (c.find(function(e) {
                                  return e.id === t.trackId
                              }) || {
                                  frameWidth: void 0
                              }).frameWidth,
                              encoderBitrate: t.encoderBitrate,
                              targetBitrate: t.targetBitrate,
                              fps: t.framesPerSecond,
                              codec: (l.find(function(e) {
                                  return e.id === t.codecId
                              }) || {
                                  mimeType: void 0
                              }).mimeType
                          })
                      }, new Map) : new Map,
                      endpointStats: h.length ? h.reduce(function(e, n) {
                          var i = n.mediaRenderers.reduce(function(e, t) {
                                  return t.stream && t.stream.getTracks().filter(function(e) {
                                      return "audio" === e.kind
                                  }).length ? Object.assign(e, r({}, t.stream.id, m(t.stream.getTracks().filter(function(e) {
                                      return "audio" === e.kind
                                  })))) : e
                              }, {}),
                              o = n.mediaRenderers.reduce(function(e, t) {
                                  return t.stream && t.stream.getTracks().filter(function(e) {
                                      return "video" === e.kind
                                  }).length ? Object.assign(e, r({}, t.stream.id, m(t.stream.getTracks().filter(function(e) {
                                      return "video" === e.kind
                                  })))) : e
                              }, {}),
                              a = Object.values(i).concat(Object.values(o));
                          return e.set(n.id, {
                              audioBytesReceived: t.sumByProp(Object.values(i), "bytesReceived"),
                              audioPacketsLost: t.sumByProp(Object.values(i), "packetsLost"),
                              audioPacketsReceived: t.sumByProp(Object.values(i), "packetsReceived"),
                              videoBytesReceived: t.sumByProp(Object.values(o), "bytesReceived"),
                              videoPacketsLost: t.sumByProp(Object.values(o), "packetsLost"),
                              videoPacketsReceived: t.sumByProp(Object.values(o), "packetsReceived"),
                              totalBytesReceived: t.sumByProp(a, "bytesReceived"),
                              totalPacketsReceived: t.sumByProp(a, "packetsReceived"),
                              remoteAudioStats: i,
                              remoteVideoStats: o,
                              timestamp: s
                          })
                      }, new Map) : new Map
                  }
              }
          }, {
              key: "getLoss",
              value: function(e) {
                  if (!e.length) return 0;
                  var t = e.reduce(function(e, t) {
                      return {
                          lost: e.lost + (t.packetsLost || 0),
                          total: e.total + (t.packetsLost || 0) + (t.packetsReceived || 0)
                      }
                  }, {
                      lost: 0,
                      total: 0
                  });
                  return t.total ? t.lost / t.total : 0
              }
          }, {
              key: "sumByProp",
              value: function(e, t) {
                  return e.length ? e.map(function(e) {
                      return e[t]
                  }).reduce(function(e) {
                      return e + (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0)
                  }, 0) : 0
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "CallStatsManager"
              }
          }, {
              key: "calls",
              get: function() {
                  return this._calls
              }
          }], [{
              key: "get",
              value: function() {
                  return void 0 === this.inst && (this.inst = new e), this.inst
              }
          }]), e
      }();
  s([u.LogManager.d_trace(u.LogCategory.RTC)], g.prototype, "addCall", null), s([u.LogManager.d_trace(u.LogCategory.RTC)], g.prototype, "deleteCall", null), t.CallStatsManager = g
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      e[e.Firefox = 0] = "Firefox", e[e.Chrome = 1] = "Chrome"
  }(t.BrowserMode || (t.BrowserMode = {}));
  ! function(e) {
      e[e.audio = "audio"] = "audio", e[e.video = "video"] = "video", e[e.sharing = "sharing"] = "sharing"
  }(t.TrackType || (t.TrackType = {}));
  ! function(e) {
      e[e.ALREADY_IN_THIS_STATE = 0] = "ALREADY_IN_THIS_STATE", e[e.FUNCTIONALITY_IS_DISABLED = 1] = "FUNCTIONALITY_IS_DISABLED", e[e.INCORRECT_OPERATION = 2] = "INCORRECT_OPERATION", e[e.INTERNAL_ERROR = 3] = "INTERNAL_ERROR", e[e.MEDIA_IS_ON_HOLD = 4] = "MEDIA_IS_ON_HOLD", e[e.REJECTED = 5] = "REJECTED", e[e.TIMEOUT = 6] = "TIMEOUT"
  }(t.CallError || (t.CallError = {}))
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  ! function(e) {
      ! function(e) {
          e[e.Critical = "CRITICAL"] = "Critical", e[e.Major = "MAJOR"] = "Major", e[e.Minor = "MINOR"] = "Minor", e[e.None = "NONE"] = "None"
      }(e.QualityIssueLevel || (e.QualityIssueLevel = {}))
  }(t.Statistic || (t.Statistic = {}))
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = function() {
      function e() {
          r(this, e)
      }
      return i(e, [{
          key: "_traceName",
          value: function() {
              return "Edge"
          }
      }], [{
          key: "attachStream",
          value: function(e, t) {
              t.srcObject = e, t.play()
          }
      }, {
          key: "detachStream",
          value: function(e) {
              e.pause(), e.src = ""
          }
      }, {
          key: "getScreenMedia",
          value: function() {
              return navigator.getDisplayMedia ? navigator.getDisplayMedia() : new Promise(function(e, t) {
                  t(new Error("Screen sharing not allowed for you platform"))
              })
          }
      }, {
          key: "getRTCStats",
          value: function(e) {
              return new Promise(function(e, t) {
                  t(new Error("RTCStats sharing not allowed for you platform"))
              })
          }
      }, {
          key: "screenSharingSupported",
          value: function() {
              return new Promise(function(e, t) {
                  if (navigator.getDisplayMedia) return void e(!0);
                  e(!1)
              })
          }
      }]), e
  }();
  t.Edge = o
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(21),
      a = n(0),
      s = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "Safari"
              }
          }], [{
              key: "attachStream",
              value: function(e, t) {
                  t.srcObject = e
              }
          }, {
              key: "detachStream",
              value: function(e) {
                  if (e instanceof HTMLVideoElement) {
                      var t = e.pause();
                      void 0 !== t && t.catch(function(e) {})
                  } else e.pause();
                  e.src = ""
              }
          }, {
              key: "getDTMFSender",
              value: function(e, t) {
                  return new o.SignalingDTMFSender(t)
              }
          }, {
              key: "getScreenMedia",
              value: function() {
                  return new Promise(function(e, t) {
                      window.postMessage("get-sourceId", "*"), window.addEventListener("message", function(n) {
                          if (n.origin == window.location.origin && ("PermissionDeniedError" == n.data && t(new Error("PermissionDeniedError")), "string" != typeof n.data && void 0 !== n.data.sourceId)) {
                              var r = {
                                  audio: !1,
                                  video: {
                                      mandatory: {
                                          chromeMediaSource: "desktop",
                                          maxWidth: screen.width > 1920 ? screen.width : 1920,
                                          maxHeight: screen.height > 1080 ? screen.height : 1080,
                                          chromeMediaSourceId: n.data.sourceId
                                      },
                                      optional: [{
                                          googTemporalLayeredScreencast: !0
                                      }]
                                  }
                              };
                              a.LogManager.get().writeMessage(a.LogCategory.USERMEDIA, "[constraints]", a.LogLevel.INFO, JSON.stringify(r)), navigator.mediaDevices.getUserMedia(r).then(function(t) {
                                  e(t)
                              }).catch(function(e) {
                                  t(e)
                              })
                          }
                      })
                  })
              }
          }, {
              key: "getRTCStats",
              value: function(t) {
                  return new Promise(function(n, r) {
                      var i = [];
                      t.getStats(null).then(function(t) {
                          t.forEach(function(e) {
                              if ("ssrc" == e.type) {
                                  var t = {};
                                  t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, i.push(t)
                              }
                          }), n({
                              raw: i,
                              formatted: e.prepareRTCStats(t)
                          })
                      }).catch(r)
                  })
              }
          }, {
              key: "prepareRTCStats",
              value: function(e) {
                  var t = [];
                  return e.forEach(function(e) {
                      "track" !== e.type || e.kind ? "outbound-rtp" === e.type || "inbound-rtp" === e.type ? t.push(Object.assign(e, {
                          trackId: e.mediaTrackId
                      })) : t.push(e) : t.push(Object.assign(e, {
                          kind: e.id.includes("audio") ? "audio" : e.id.includes("video") ? "video" : void 0
                      }))
                  }), t
              }
          }]), e
      }();
  t.Safari = s
}, function(e, t, n) {
  ! function(t, n) {
      e.exports = n()
  }(0, function() {
      return function(e) {
          function t(r) {
              if (n[r]) return n[r].exports;
              var i = n[r] = {
                  i: r,
                  l: !1,
                  exports: {}
              };
              return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
          }
          var n = {};
          return t.m = e, t.c = n, t.d = function(e, n, r) {
              t.o(e, n) || Object.defineProperty(e, n, {
                  enumerable: !0,
                  get: r
              })
          }, t.r = function(e) {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                  value: "Module"
              }), Object.defineProperty(e, "__esModule", {
                  value: !0
              })
          }, t.t = function(e, n) {
              if (1 & n && (e = t(e)), 8 & n) return e;
              if (4 & n && "object" == typeof e && e && e.__esModule) return e;
              var r = Object.create(null);
              if (t.r(r), Object.defineProperty(r, "default", {
                      enumerable: !0,
                      value: e
                  }), 2 & n && "string" != typeof e)
                  for (var i in e) t.d(r, i, function(t) {
                      return e[t]
                  }.bind(null, i));
              return r
          }, t.n = function(e) {
              var n = e && e.__esModule ? function() {
                  return e.default
              } : function() {
                  return e
              };
              return t.d(n, "a", n), n
          }, t.o = function(e, t) {
              return Object.prototype.hasOwnProperty.call(e, t)
          }, t.p = "", t(t.s = 86)
      }({
          17: function(e, t, n) {
              var r, i, o;
              i = [t], void 0 === (o = "function" == typeof(r = function(n) {
                  "use strict";

                  function r(e, t) {
                      for (var n = 0; n < t.length; n++) {
                          var r = t[n];
                          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                      }
                  }
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0;
                  var i = function() {
                      function e() {
                          ! function(e, t) {
                              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                          }(this, e)
                      }
                      return t = e, i = [{
                          key: "getFirstMatch",
                          value: function(e, t) {
                              var n = t.match(e);
                              return n && n.length > 0 && n[1] || ""
                          }
                      }, {
                          key: "getSecondMatch",
                          value: function(e, t) {
                              var n = t.match(e);
                              return n && n.length > 1 && n[2] || ""
                          }
                      }, {
                          key: "matchAndReturnConst",
                          value: function(e, t, n) {
                              if (e.test(t)) return n
                          }
                      }, {
                          key: "getWindowsVersionName",
                          value: function(e) {
                              switch (e) {
                                  case "NT":
                                      return "NT";
                                  case "XP":
                                      return "XP";
                                  case "NT 5.0":
                                      return "2000";
                                  case "NT 5.1":
                                      return "XP";
                                  case "NT 5.2":
                                      return "2003";
                                  case "NT 6.0":
                                      return "Vista";
                                  case "NT 6.1":
                                      return "7";
                                  case "NT 6.2":
                                      return "8";
                                  case "NT 6.3":
                                      return "8.1";
                                  case "NT 10.0":
                                      return "10";
                                  default:
                                      return
                              }
                          }
                      }, {
                          key: "getAndroidVersionName",
                          value: function(e) {
                              var t = e.split(".").splice(0, 2).map(function(e) {
                                  return parseInt(e, 10) || 0
                              });
                              if (t.push(0), !(1 === t[0] && t[1] < 5)) return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : void 0
                          }
                      }, {
                          key: "getVersionPrecision",
                          value: function(e) {
                              return e.split(".").length
                          }
                      }, {
                          key: "compareVersions",
                          value: function(t, n) {
                              var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                                  i = e.getVersionPrecision(t),
                                  o = e.getVersionPrecision(n),
                                  a = Math.max(i, o),
                                  s = 0,
                                  c = e.map([t, n], function(t) {
                                      var n = a - e.getVersionPrecision(t),
                                          r = t + new Array(n + 1).join(".0");
                                      return e.map(r.split("."), function(e) {
                                          return new Array(20 - e.length).join("0") + e
                                      }).reverse()
                                  });
                              for (r && (s = a - Math.min(i, o)), a -= 1; a >= s;) {
                                  if (c[0][a] > c[1][a]) return 1;
                                  if (c[0][a] === c[1][a]) {
                                      if (a === s) return 0;
                                      a -= 1
                                  } else if (c[0][a] < c[1][a]) return -1
                              }
                          }
                      }, {
                          key: "map",
                          value: function(e, t) {
                              var n, r = [];
                              if (Array.prototype.map) return Array.prototype.map.call(e, t);
                              for (n = 0; n < e.length; n += 1) r.push(t(e[n]));
                              return r
                          }
                      }], (n = null) && r(t.prototype, n), i && r(t, i), e;
                      var t, n, i
                  }();
                  n.default = i, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          },
          86: function(e, t, n) {
              var r, i, o;
              i = [t, n(87)], void 0 === (o = "function" == typeof(r = function(n, r) {
                  "use strict";

                  function i(e, t) {
                      for (var n = 0; n < t.length; n++) {
                          var r = t[n];
                          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                      }
                  }
                  var o;
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0, r = (o = r) && o.__esModule ? o : {
                      default: o
                  };
                  var a = function() {
                      function e() {
                          ! function(e, t) {
                              if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                          }(this, e)
                      }
                      return t = e, o = [{
                          key: "getParser",
                          value: function(e) {
                              var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                              if ("string" != typeof e) throw new Error("UserAgent should be a string");
                              return new r.default(e, t)
                          }
                      }, {
                          key: "parse",
                          value: function(e) {
                              return new r.default(e).getResult()
                          }
                      }], (n = null) && i(t.prototype, n), o && i(t, o), e;
                      var t, n, o
                  }();
                  n.default = a, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          },
          87: function(e, t, n) {
              var r, i, o;
              i = [t, n(88), n(89), n(90), n(91), n(17)], void 0 === (o = "function" == typeof(r = function(n, r, i, o, a, s) {
                  "use strict";

                  function c(e) {
                      return e && e.__esModule ? e : {
                          default: e
                      }
                  }

                  function l(e) {
                      return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                          return typeof e
                      } : function(e) {
                          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                      })(e)
                  }

                  function u(e, t) {
                      for (var n = 0; n < t.length; n++) {
                          var r = t[n];
                          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                      }
                  }
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0, r = c(r), i = c(i), o = c(o), a = c(a), s = c(s);
                  var d = function() {
                      function e(t) {
                          var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                          if (function(e, t) {
                                  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                              }(this, e), null == t || "" === t) throw new Error("UserAgent parameter can't be empty");
                          this._ua = t, this.parsedResult = {}, !0 !== n && this.parse()
                      }
                      return t = e, (n = [{
                          key: "getUA",
                          value: function() {
                              return this._ua
                          }
                      }, {
                          key: "test",
                          value: function(e) {
                              return e.test(this._ua)
                          }
                      }, {
                          key: "parseBrowser",
                          value: function() {
                              var e = this;
                              this.parsedResult.browser = {};
                              var t = r.default.find(function(t) {
                                  if ("function" == typeof t.test) return t.test(e);
                                  if (t.test instanceof Array) return t.test.some(function(t) {
                                      return e.test(t)
                                  });
                                  throw new Error("Browser's test function is not valid")
                              });
                              return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser
                          }
                      }, {
                          key: "getBrowser",
                          value: function() {
                              return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
                          }
                      }, {
                          key: "getBrowserName",
                          value: function(e) {
                              return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
                          }
                      }, {
                          key: "getBrowserVersion",
                          value: function() {
                              return this.getBrowser().version
                          }
                      }, {
                          key: "getOS",
                          value: function() {
                              return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
                          }
                      }, {
                          key: "parseOS",
                          value: function() {
                              var e = this;
                              this.parsedResult.os = {};
                              var t = i.default.find(function(t) {
                                  if ("function" == typeof t.test) return t.test(e);
                                  if (t.test instanceof Array) return t.test.some(function(t) {
                                      return e.test(t)
                                  });
                                  throw new Error("Browser's test function is not valid")
                              });
                              return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os
                          }
                      }, {
                          key: "getOSName",
                          value: function(e) {
                              var t = this.getOS(),
                                  n = t.name;
                              return e ? String(n).toLowerCase() || "" : n || ""
                          }
                      }, {
                          key: "getOSVersion",
                          value: function() {
                              return this.getOS().version
                          }
                      }, {
                          key: "getPlatform",
                          value: function() {
                              return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
                          }
                      }, {
                          key: "getPlatformType",
                          value: function() {
                              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                                  t = this.getPlatform(),
                                  n = t.type;
                              return e ? String(n).toLowerCase() || "" : n || ""
                          }
                      }, {
                          key: "parsePlatform",
                          value: function() {
                              var e = this;
                              this.parsedResult.platform = {};
                              var t = o.default.find(function(t) {
                                  if ("function" == typeof t.test) return t.test(e);
                                  if (t.test instanceof Array) return t.test.some(function(t) {
                                      return e.test(t)
                                  });
                                  throw new Error("Browser's test function is not valid")
                              });
                              return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform
                          }
                      }, {
                          key: "getEngine",
                          value: function() {
                              return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
                          }
                      }, {
                          key: "getEngineName",
                          value: function(e) {
                              return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
                          }
                      }, {
                          key: "parseEngine",
                          value: function() {
                              var e = this;
                              this.parsedResult.engine = {};
                              var t = a.default.find(function(t) {
                                  if ("function" == typeof t.test) return t.test(e);
                                  if (t.test instanceof Array) return t.test.some(function(t) {
                                      return e.test(t)
                                  });
                                  throw new Error("Browser's test function is not valid")
                              });
                              return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine
                          }
                      }, {
                          key: "parse",
                          value: function() {
                              return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this
                          }
                      }, {
                          key: "getResult",
                          value: function() {
                              return Object.assign({}, this.parsedResult)
                          }
                      }, {
                          key: "satisfies",
                          value: function(e) {
                              var t = this,
                                  n = {},
                                  r = 0,
                                  i = {},
                                  o = 0;
                              if (Object.keys(e).forEach(function(t) {
                                      var a = e[t];
                                      "string" == typeof a ? (i[t] = a, o += 1) : "object" === l(a) && (n[t] = a, r += 1)
                                  }), r > 0) {
                                  var a = Object.keys(n),
                                      s = a.find(function(e) {
                                          return t.isOS(e)
                                      });
                                  if (s) {
                                      var c = this.satisfies(n[s]);
                                      if (void 0 !== c) return c
                                  }
                                  var u = a.find(function(e) {
                                      return t.isPlatform(e)
                                  });
                                  if (u) {
                                      var d = this.satisfies(n[u]);
                                      if (void 0 !== d) return d
                                  }
                              }
                              if (o > 0) {
                                  var g = Object.keys(i),
                                      f = g.find(function(e) {
                                          return t.isBrowser(e)
                                      });
                                  if (void 0 !== f) return this.compareVersion(i[f])
                              }
                          }
                      }, {
                          key: "isBrowser",
                          value: function(e) {
                              return this.getBrowserName(!0) === String(e).toLowerCase()
                          }
                      }, {
                          key: "compareVersion",
                          value: function(e) {
                              var t = [0],
                                  n = e,
                                  r = !1,
                                  i = this.getBrowserVersion();
                              if ("string" == typeof i) return ">" === e[0] || "<" === e[0] ? (n = e.substr(1), "=" === e[1] ? (r = !0, n = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? n = e.substr(1) : "~" === e[0] && (r = !0, n = e.substr(1)), t.indexOf(s.default.compareVersions(i, n, r)) > -1
                          }
                      }, {
                          key: "isOS",
                          value: function(e) {
                              return this.getOSName(!0) === String(e).toLowerCase()
                          }
                      }, {
                          key: "isPlatform",
                          value: function(e) {
                              return this.getPlatformType(!0) === String(e).toLowerCase()
                          }
                      }, {
                          key: "isEngine",
                          value: function(e) {
                              return this.getEngineName(!0) === String(e).toLowerCase()
                          }
                      }, {
                          key: "is",
                          value: function(e) {
                              return this.isBrowser(e) || this.isOS(e) || this.isPlatform(e)
                          }
                      }, {
                          key: "some",
                          value: function() {
                              var e = this;
                              return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).some(function(t) {
                                  return e.is(t)
                              })
                          }
                      }]) && u(t.prototype, n), c && u(t, c), e;
                      var t, n, c
                  }();
                  n.default = d, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          },
          88: function(e, t, n) {
              var r, i, o;
              i = [t, n(17)], void 0 === (o = "function" == typeof(r = function(n, r) {
                  "use strict";
                  var i;
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0, r = (i = r) && i.__esModule ? i : {
                      default: i
                  };
                  var o = /version\/(\d+(\.?_?\d+)+)/i,
                      a = [{
                          test: [/googlebot/i],
                          describe: function(e) {
                              var t = {
                                      name: "Googlebot"
                                  },
                                  n = r.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/opera/i],
                          describe: function(e) {
                              var t = {
                                      name: "Opera"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/opr\/|opios/i],
                          describe: function(e) {
                              var t = {
                                      name: "Opera"
                                  },
                                  n = r.default.getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/SamsungBrowser/i],
                          describe: function(e) {
                              var t = {
                                      name: "Samsung Internet for Android"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/Whale/i],
                          describe: function(e) {
                              var t = {
                                      name: "NAVER Whale Browser"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/MZBrowser/i],
                          describe: function(e) {
                              var t = {
                                      name: "MZ Browser"
                                  },
                                  n = r.default.getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/focus/i],
                          describe: function(e) {
                              var t = {
                                      name: "Focus"
                                  },
                                  n = r.default.getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/swing/i],
                          describe: function(e) {
                              var t = {
                                      name: "Swing"
                                  },
                                  n = r.default.getFirstMatch(/(?:swing)[\s\/](\d+(?:\.\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/coast/i],
                          describe: function(e) {
                              var t = {
                                      name: "Opera Coast"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/yabrowser/i],
                          describe: function(e) {
                              var t = {
                                      name: "Yandex Browser"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/ucbrowser/i],
                          describe: function(e) {
                              var t = {
                                      name: "UC Browser"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/Maxthon|mxios/i],
                          describe: function(e) {
                              var t = {
                                      name: "Maxthon"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:Maxthon|mxios)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/epiphany/i],
                          describe: function(e) {
                              var t = {
                                      name: "Epiphany"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/puffin/i],
                          describe: function(e) {
                              var t = {
                                      name: "Puffin"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/sleipnir/i],
                          describe: function(e) {
                              var t = {
                                      name: "Sleipnir"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/k-meleon/i],
                          describe: function(e) {
                              var t = {
                                      name: "K-Meleon"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/micromessenger/i],
                          describe: function(e) {
                              var t = {
                                      name: "WeChat"
                                  },
                                  n = r.default.getFirstMatch(/(?:micromessenger)[\s\/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/msie|trident/i],
                          describe: function(e) {
                              var t = {
                                      name: "Internet Explorer"
                                  },
                                  n = r.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/edg([ea]|ios)/i],
                          describe: function(e) {
                              var t = {
                                      name: "Microsoft Edge"
                                  },
                                  n = r.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/vivaldi/i],
                          describe: function(e) {
                              var t = {
                                      name: "Vivaldi"
                                  },
                                  n = r.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/seamonkey/i],
                          describe: function(e) {
                              var t = {
                                      name: "SeaMonkey"
                                  },
                                  n = r.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/sailfish/i],
                          describe: function(e) {
                              var t = {
                                      name: "Sailfish"
                                  },
                                  n = r.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/silk/i],
                          describe: function(e) {
                              var t = {
                                      name: "Amazon Silk"
                                  },
                                  n = r.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/phantom/i],
                          describe: function(e) {
                              var t = {
                                      name: "PhantomJS"
                                  },
                                  n = r.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/slimerjs/i],
                          describe: function(e) {
                              var t = {
                                      name: "SlimerJS"
                                  },
                                  n = r.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                          describe: function(e) {
                              var t = {
                                      name: "BlackBerry"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/(web|hpw)[o0]s/i],
                          describe: function(e) {
                              var t = {
                                      name: "WebOS Browser"
                                  },
                                  n = r.default.getFirstMatch(o, e) || r.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/bada/i],
                          describe: function(e) {
                              var t = {
                                      name: "Bada"
                                  },
                                  n = r.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/tizen/i],
                          describe: function(e) {
                              var t = {
                                      name: "Tizen"
                                  },
                                  n = r.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/qupzilla/i],
                          describe: function(e) {
                              var t = {
                                      name: "QupZilla"
                                  },
                                  n = r.default.getFirstMatch(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/firefox|iceweasel|fxios/i],
                          describe: function(e) {
                              var t = {
                                      name: "Firefox"
                                  },
                                  n = r.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s\/](\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/chromium/i],
                          describe: function(e) {
                              var t = {
                                      name: "Chromium"
                                  },
                                  n = r.default.getFirstMatch(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i, e) || r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/chrome|crios|crmo/i],
                          describe: function(e) {
                              var t = {
                                      name: "Chrome"
                                  },
                                  n = r.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: function(e) {
                              var t = !e.test(/like android/i),
                                  n = e.test(/android/i);
                              return t && n
                          },
                          describe: function(e) {
                              var t = {
                                      name: "Android Browser"
                                  },
                                  n = r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/playstation 4/i],
                          describe: function(e) {
                              var t = {
                                      name: "PlayStation 4"
                                  },
                                  n = r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/safari|applewebkit/i],
                          describe: function(e) {
                              var t = {
                                      name: "Safari"
                                  },
                                  n = r.default.getFirstMatch(o, e);
                              return n && (t.version = n), t
                          }
                      }, {
                          test: [/.*/i],
                          describe: function(e) {
                              return {
                                  name: r.default.getFirstMatch(/^(.*)\/(.*) /, e),
                                  version: r.default.getSecondMatch(/^(.*)\/(.*) /, e)
                              }
                          }
                      }];
                  n.default = a, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          },
          89: function(e, t, n) {
              var r, i, o;
              i = [t, n(17)], void 0 === (o = "function" == typeof(r = function(n, r) {
                  "use strict";
                  var i;
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0, r = (i = r) && i.__esModule ? i : {
                      default: i
                  };
                  var o = [{
                      test: [/windows phone/i],
                      describe: function(e) {
                          return {
                              name: "Windows Phone",
                              version: r.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e)
                          }
                      }
                  }, {
                      test: [/windows/i],
                      describe: function(e) {
                          var t = r.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e);
                          return {
                              name: "Windows",
                              version: t,
                              versionName: r.default.getWindowsVersionName(t)
                          }
                      }
                  }, {
                      test: [/macintosh/i],
                      describe: function(e) {
                          return {
                              name: "macOS",
                              version: r.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, ".")
                          }
                      }
                  }, {
                      test: [/(ipod|iphone|ipad)/i],
                      describe: function(e) {
                          return {
                              name: "iOS",
                              version: r.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".")
                          }
                      }
                  }, {
                      test: function(e) {
                          var t = !e.test(/like android/i),
                              n = e.test(/android/i);
                          return t && n
                      },
                      describe: function(e) {
                          var t = r.default.getFirstMatch(/android[\s\/-](\d+(\.\d+)*)/i, e),
                              n = r.default.getAndroidVersionName(t),
                              i = {
                                  name: "Android",
                                  version: t
                              };
                          return n && (i.versionName = n), i
                      }
                  }, {
                      test: [/(web|hpw)[o0]s/i],
                      describe: function(e) {
                          var t = r.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e),
                              n = {
                                  name: "WebOS"
                              };
                          return t && t.length && (n.version = t), n
                      }
                  }, {
                      test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                      describe: function(e) {
                          return {
                              name: "BlackBerry",
                              version: r.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || r.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || r.default.getFirstMatch(/\bbb(\d+)/i, e)
                          }
                      }
                  }, {
                      test: [/bada/i],
                      describe: function(e) {
                          return {
                              name: "Bada",
                              version: r.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e)
                          }
                      }
                  }, {
                      test: [/tizen/i],
                      describe: function(e) {
                          return {
                              name: "Tizen",
                              version: r.default.getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i, e)
                          }
                      }
                  }, {
                      test: [/linux/i],
                      describe: function() {
                          return {
                              name: "Linux"
                          }
                      }
                  }, {
                      test: [/CrOS/],
                      describe: function() {
                          return {
                              name: "Chrome OS"
                          }
                      }
                  }, {
                      test: [/PlayStation 4/],
                      describe: function(e) {
                          return {
                              name: "PlayStation 4",
                              version: r.default.getFirstMatch(/PlayStation 4[\/\s](\d+(\.\d+)*)/i, e)
                          }
                      }
                  }];
                  n.default = o, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          },
          90: function(e, t, n) {
              var r, i, o;
              i = [t, n(17)], void 0 === (o = "function" == typeof(r = function(n, r) {
                  "use strict";
                  var i;
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0, r = (i = r) && i.__esModule ? i : {
                      default: i
                  };
                  var o = {
                          tablet: "tablet",
                          mobile: "mobile",
                          desktop: "desktop",
                          tv: "tv"
                      },
                      a = [{
                          test: [/googlebot/i],
                          describe: function() {
                              return {
                                  type: "bot",
                                  vendor: "Google"
                              }
                          }
                      }, {
                          test: [/huawei/i],
                          describe: function(e) {
                              var t = r.default.getFirstMatch(/(can-l01)/i, e) && "Nova",
                                  n = {
                                      type: o.mobile,
                                      vendor: "Huawei"
                                  };
                              return t && (n.model = t), n
                          }
                      }, {
                          test: [/nexus\s*(?:7|8|9|10).*/i],
                          describe: function() {
                              return {
                                  type: o.tablet,
                                  vendor: "Nexus"
                              }
                          }
                      }, {
                          test: [/ipad/i],
                          describe: function() {
                              return {
                                  type: o.tablet,
                                  vendor: "Apple",
                                  model: "iPad"
                              }
                          }
                      }, {
                          test: [/kftt build/i],
                          describe: function() {
                              return {
                                  type: o.tablet,
                                  vendor: "Amazon",
                                  model: "Kindle Fire HD 7"
                              }
                          }
                      }, {
                          test: [/silk/i],
                          describe: function() {
                              return {
                                  type: o.tablet,
                                  vendor: "Amazon"
                              }
                          }
                      }, {
                          test: [/tablet/i],
                          describe: function() {
                              return {
                                  type: o.tablet
                              }
                          }
                      }, {
                          test: function(e) {
                              var t = e.test(/ipod|iphone/i),
                                  n = e.test(/like (ipod|iphone)/i);
                              return t && !n
                          },
                          describe: function(e) {
                              var t = r.default.getFirstMatch(/(ipod|iphone)/i, e);
                              return {
                                  type: o.mobile,
                                  vendor: "Apple",
                                  model: t
                              }
                          }
                      }, {
                          test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                          describe: function() {
                              return {
                                  type: o.mobile,
                                  vendor: "Nexus"
                              }
                          }
                      }, {
                          test: [/[^-]mobi/i],
                          describe: function() {
                              return {
                                  type: o.mobile
                              }
                          }
                      }, {
                          test: function(e) {
                              return "blackberry" === e.getBrowserName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.mobile,
                                  vendor: "BlackBerry"
                              }
                          }
                      }, {
                          test: function(e) {
                              return "bada" === e.getBrowserName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.mobile
                              }
                          }
                      }, {
                          test: function(e) {
                              return "windows phone" === e.getBrowserName()
                          },
                          describe: function() {
                              return {
                                  type: o.mobile,
                                  vendor: "Microsoft"
                              }
                          }
                      }, {
                          test: function(e) {
                              var t = Number(String(e.getOSVersion()).split(".")[0]);
                              return "android" === e.getOSName(!0) && t >= 3
                          },
                          describe: function() {
                              return {
                                  type: o.tablet
                              }
                          }
                      }, {
                          test: function(e) {
                              return "android" === e.getOSName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.mobile
                              }
                          }
                      }, {
                          test: function(e) {
                              return "macos" === e.getOSName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.desktop,
                                  vendor: "Apple"
                              }
                          }
                      }, {
                          test: function(e) {
                              return "windows" === e.getOSName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.desktop
                              }
                          }
                      }, {
                          test: function(e) {
                              return "linux" === e.getOSName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.desktop
                              }
                          }
                      }, {
                          test: function(e) {
                              return "playstation 4" === e.getOSName(!0)
                          },
                          describe: function() {
                              return {
                                  type: o.tv
                              }
                          }
                      }];
                  n.default = a, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          },
          91: function(e, t, n) {
              var r, i, o;
              i = [t, n(17)], void 0 === (o = "function" == typeof(r = function(n, r) {
                  "use strict";
                  var i;
                  Object.defineProperty(n, "__esModule", {
                      value: !0
                  }), n.default = void 0, r = (i = r) && i.__esModule ? i : {
                      default: i
                  };
                  var o = [{
                      test: function(e) {
                          return "microsoft edge" === e.getBrowserName(!0)
                      },
                      describe: function(e) {
                          return {
                              name: "EdgeHTML",
                              version: r.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e)
                          }
                      }
                  }, {
                      test: [/trident/i],
                      describe: function(e) {
                          var t = {
                                  name: "Trident"
                              },
                              n = r.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                          return n && (t.version = n), t
                      }
                  }, {
                      test: function(e) {
                          return e.test(/presto/i)
                      },
                      describe: function(e) {
                          var t = {
                                  name: "Presto"
                              },
                              n = r.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                          return n && (t.version = n), t
                      }
                  }, {
                      test: function(e) {
                          var t = e.test(/gecko/i),
                              n = e.test(/like gecko/i);
                          return t && !n
                      },
                      describe: function(e) {
                          var t = {
                                  name: "Gecko"
                              },
                              n = r.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                          return n && (t.version = n), t
                      }
                  }, {
                      test: [/(apple)?webkit\/537\.36/i],
                      describe: function() {
                          return {
                              name: "Blink"
                          }
                      }
                  }, {
                      test: [/(apple)?webkit/i],
                      describe: function(e) {
                          var t = {
                                  name: "WebKit"
                              },
                              n = r.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                          return n && (t.version = n), t
                      }
                  }];
                  n.default = o, e.exports = t.default
              }) ? r.apply(t, i) : r) || (e.exports = o)
          }
      })
  })
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function i(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
  }

  function o(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
          constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
          }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
  }
  var a = function() {
          function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
          }
      }(),
      s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
      } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      },
      c = function(e, t, n, r) {
          var i, o = arguments.length,
              a = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" === ("undefined" == typeof Reflect ? "undefined" : s(Reflect)) && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, r);
          else
              for (var c = e.length - 1; c >= 0; c--)(i = e[c]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, n, a) : i(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a
      };
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var l, u = n(22),
      d = n(7),
      g = n(8),
      f = n(0),
      p = n(2),
      v = n(6),
      h = n(3),
      m = n(40),
      y = n(5),
      C = n(17),
      S = n(10),
      _ = n(16),
      E = n(1),
      L = n(32),
      M = n(4),
      b = n(23),
      R = n(31);
  ! function(e) {
      e[e.offer = "offer"] = "offer", e[e.answer = "answer"] = "answer", e[e.pranswer = "pranswer"] = "pranswer", e[e.rollback = "rollback"] = "rollback"
  }(l || (l = {}));
  var T;
  ! function(e) {
      e[e.controlling = "controlling"] = "controlling", e[e.controlled = "controlled"] = "controlled"
  }(T || (T = {}));
  var k = function(e) {
      function t(e, n, o, a) {
          r(this, t);
          var s = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, o));
          s.iceTimer = null, s.needTransportRestart = !0, s.ICE_TIMEOUT = 2e4, s.RENEGOTIATION_TIMEOUT = 15e3, s.canDeliverStats = !0, s._canReInvite = function() {
              return "connected" === s.impl.iceConnectionState || "completed" === s.impl.iceConnectionState
          }, s._needIceRestart = !1;
          var c = g.PCFactory.get().iceConfig,
              l = c;
          return void 0 !== l && null !== l || (l = {
              gatherPolicy: "all",
              iceServers: []
          }), a && (l.iceServers = a), l.bundlePolicy = "max-compat", "chrome" === d.default.getWSVendor() && E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.unifiedPlan && (l.sdpSemantics = "unified-plan"), s._createImpl(l), s
      }
      return o(t, e), a(t, [{
          key: "_createImpl",
          value: function(e) {
              var t = this;
              if (this.mode === u.PeerConnectionMode.CONFERENCE && "chrome" === d.default.getWSVendor()) {
                  var n = {
                          mandatory: {},
                          optional: [{
                              googHighStartBitrate: !0
                          }, {
                              googHighBitrate: !0
                          }, {
                              googSkipEncodingUnusedStreams: !0
                          }, {
                              googScreencastMinBitrate: 400
                          }, {
                              googVeryHighBitrate: !0
                          }, {
                              googCpuOveruseDetection: !0
                          }, {
                              googCpuOveruseEncodeUsage: !0
                          }, {
                              googCpuUnderuseThreshold: 55
                          }, {
                              googCpuOveruseThreshold: 85
                          }]
                      },
                      r = RTCPeerConnection;
                  this.impl = new r(e, n)
              } else this.impl = new RTCPeerConnection(e);
              if (this.impl.getTransceivers && "firefox" === d.default.getWSVendor() && (g.PCFactory.hasTransceivers = !0), void 0 !== this.impl.ontrack ? this.impl.ontrack = function(e) {
                      return t.onAddTrack(e)
                  } : void 0 !== this.impl.onaddtrack ? this.impl.onaddtrack = function(e) {
                      return t.onAddTrack(e)
                  } : this.impl.onaddstream = function(e) {
                      return t.onAddStream(e)
                  }, this.impl.onicecandidate = function(e) {
                      t.onICECandidate(e.candidate)
                  }, this.impl.oniceconnectionstatechange = function(e) {
                      "completed" !== t.impl.iceConnectionState && "connected" !== t.impl.iceConnectionState || (t.iceTimer && clearTimeout(t.iceTimer), t.iceTimer = null, t.reInviteQ && t.reInviteQ.runNext()), "failed" === t.impl.iceConnectionState && (t.renegotiationInProgress = !1, t._runReinvite(!0))
                  }, this.rtpSenders = [], this.renegotiationInProgress = !1, this.impl.onnegotiationneeded = function(e) {
                      return t.onRenegotiation()
                  }, this.impl.onsignalingstatechange = function(e) {
                      return t.onSignalingStateChange()
                  }, this.impl.oniceconnectionstatechange = function(e) {
                      return t.onConnectionChange()
                  }, this.iceRole = T.controlling, this._remoteStreams = [], this.banReinviteAnswer = !1, this._call = v.CallManager.get().calls[this.id], void 0 !== this._call ? this.onHold = !this._call.active() : this.onHold = !1, this.rtcCollectingCycle = setInterval(function() {
                      t.getPCStats()
                  }, v.CallManager.get().rtcStatsInquiryInterval), void 0 !== this._call) {
                  var i = this._call.headers()[S.Constants.CALLSTATSIOID_HEADER];
                  void 0 === i && (i = this._call.id()), C.CallstatsIo.get().addNewFabric(this.impl, this._call.number(), this.videoEnabled ? C.CallstatsIoFabricUsage.multiplex : C.CallstatsIoFabricUsage.audio, i)
              }
              this.needTransportRestart = !1, "_default" !== this.id && v.CallManager.get().calls[this.id] && (this.reInviteQ = new L.ReInviteQ(v.CallManager.get().calls[this.id], this._canReInvite))
          }
      }, {
          key: "onSignalingStateChange",
          value: function() {
              this.logger.info("Signal state changed to " + this.impl.signalingState + " for PC: " + this.id), this.impl.signalingState
          }
      }, {
          key: "getPCStats",
          value: function() {
              var e = this;
              d.default.getRTCStats(this.impl).then(function(t) {
                  return v.CallManager.get().callStats.sendStatistics(e._call, t)
              })
          }
      }, {
          key: "onConnectionChange",
          value: function() {
              "completed" === this.impl.iceConnectionState && void 0 !== this._call && this._call.dispatchEvent({
                  name: "ICECompleted",
                  call: this._call
              }), "completed" !== this.impl.iceConnectionState && "connected" !== this.impl.iceConnectionState || (this.iceTimer && clearTimeout(this.iceTimer), this.iceTimer = null, this.reInviteQ && this.reInviteQ.runNext()), R.CallStatsAnalyzer.get().checkICEConnection(this._call, this.impl.iceConnectionState)
          }
      }, {
          key: "onRenegotiation",
          value: function() {
              if (void 0 !== this.impl) {
                  if ("disconnected" === this.impl.connectionState || "failed" === this.impl.connectionState) return void this.logger.info("Renegotiation requested on closed PeerConnection");
                  if (null === this.impl.localDescription) return void this.logger.info("Renegotiation needed, but no local SD. Skipping");
                  if ("connected" !== this.impl.iceConnectionState && "completed" !== this.impl.iceConnectionState) return this.logger.info("Renegotiation requested while ice state is " + this.impl.iceConnectionState + ". Postponing"), void setTimeout(this.onRenegotiation, 100);
                  if (this.renegotiationInProgress) return void this.logger.info("Renegotiation in progress. Queueing");
                  this.logger.info("Renegotiation started"), this._runReinvite()
              }
          }
      }, {
          key: "_getLocalOfferRegular",
          value: function() {
              var e = this;
              return this.iceRole = T.controlling, new Promise(function(t, n) {
                  var r = e.getReceiveOptions();
                  e.impl.createOffer(r).then(function(t) {
                      e.logger.info("_getLocalOfferRegular(), created local SDP: \n" + t.sdp);
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), n = _.SDPMuggle.removeDoublePT(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), e.codecRearrange(n)
                  }).then(function(t) {
                      return e.srcLocalSDP = t.sdp, e.logger.info("_getLocalOfferRegular(), set local SDP: \n" + t.sdp), e.impl.setLocalDescription(t)
                  }).then(function() {
                      t(e.impl.localDescription)
                  }).catch(function(e) {
                      n(e)
                  })
              })
          }
      }, {
          key: "getReceiveOptions",
          value: function() {
              return {
                  offerToReceiveAudio: !this.onHold,
                  offerToReceiveVideo: this.videoEnabled.receiveVideo && !this.onHold
              }
          }
      }, {
          key: "updateHoldState",
          value: function() {
              var e = this;
              this.impl.getTransceivers().forEach(function(t) {
                  t.sender.track && ("audio" === t.sender.track.kind ? t.sender.track.enabled = !e.onHold && !e.muteMicState : t.sender.track.enabled = !e.onHold)
              })
          }
      }, {
          key: "onICECandidate",
          value: function(e) {
              e && null !== e && "" !== e.candidate ? this.sendLocalCandidateToPeer("a=" + e.candidate, e.sdpMLineIndex) : this.logger.info("End of candidates")
          }
      }, {
          key: "onAddTrack",
          value: function(e) {
              this._call && b.EndpointManager.get().addTrack(this._call, e.track)
          }
      }, {
          key: "onAddStream",
          value: function(e) {
              this._call && b.EndpointManager.get().addStream(this._call, e.stream)
          }
      }, {
          key: "_processRemoteAnswer",
          value: function(e, t) {
              var n = this;
              if (this._pendingOffer) return new Promise(function(r, i) {
                  n.logger.info("_processRemoteAnswer(), set local SDP: \n" + n._pendingOffer.sdp), n.impl.setLocalDescription(n._pendingOffer).then(function() {
                      r(n._processRemoteAnswer(e, t))
                  }), n._pendingOffer = void 0
              });
              if (0 === t.length && this._call) return this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              });
              if (this.iceTimer = setTimeout(function() {
                      n._call.notifyICETimeout()
                  }, this.ICE_TIMEOUT), this.pendingEvent = [e, t], null === this.impl.remoteDescription || "" == this.impl.remoteDescription.sdp) {
                  var r = {
                      sdp: t,
                      type: l.answer
                  };
                  return this.srcRemoteSDP = t, r = _.SDPMuggle.removeTIAS(r), this.logger.info("_processRemoteAnswer(), set remote SDP: \n" + r.sdp), this.impl.setRemoteDescription(r).then(function(e) {
                      n._needIceRestart && n._runReinvite(!0)
                  })
              }
          }
      }, {
          key: "_getLocalOffer",
          value: function() {
              return "firefox" === d.default.getWSVendor() && this.impl.remoteDescription && this.impl.remoteDescription.sdp && -1 === this.impl.remoteDescription.sdp.indexOf("VIMS") ? this._getLocalOfferFF() : this._getLocalOfferRegular()
          }
      }, {
          key: "_getLocalOfferFF",
          value: function() {
              var e = this;
              return this.iceRole = T.controlling, new Promise(function(t, n) {
                  var r = e.getReceiveOptions();
                  e.impl.createOffer(r).then(function(t) {
                      e.logger.info("_getLocalOfferFF(), created local SDP: \n" + t.sdp);
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), n = _.SDPMuggle.removeDoublePT(n), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), e.codecRearrange(n)
                  }).then(function(n) {
                      e.srcLocalSDP = n.sdp, e._pendingOffer = n, t(n)
                  }).catch(function(e) {
                      n(e)
                  })
              })
          }
      }, {
          key: "_runReinvite",
          value: function() {
              var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (!1 === this.renegotiationInProgress) {
                  this.renegotiationInProgress = !0;
                  var n = {};
                  this.impl.getTransceivers && "firefox" === d.default.getWSVendor() || (n = this.getReceiveOptions()), t && (n.iceRestart = !0), this.logger.trace(JSON.stringify(n)), this.updateHoldState(), this.impl.createOffer(n).then(function(t) {
                      return e.logger.info("_runReinvite(), created local SDP: \n" + t.sdp), e.codecRearrange(t)
                  }).then(function(t) {
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), n = _.SDPMuggle.removeTelephoneEvents(n), n = _.SDPMuggle.removeDoubleOpus(n), n = _.SDPMuggle.removeDoublePT(n), n = _.SDPMuggle.fixVideoRecieve(n, e.videoEnabled.receiveVideo), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), n
                  }).then(function(t) {
                      return e.srcLocalSDP = t.sdp, e.pendingOffer = t, t
                  }).then(function() {
                      var t = {
                          tracks: e.getTrackKind()
                      };
                      p.VoxSignaling.get().callRemoteFunction(h.RemoteFunction.reInvite, e._call.id(), {}, e.pendingOffer.sdp, t)
                  }).catch(function(t) {
                      e.logger.error("Error when renegatiation start " + t.message)
                  })
              } else this.logger.error("Another renegatiation in progress")
          }
      }, {
          key: "_getLocalAnswer",
          value: function() {
              var e = this;
              return this.iceRole = T.controlled, new Promise(function(t, n) {
                  var r = {
                      mandatory: e.getReceiveOptions()
                  };
                  e.impl.createAnswer(r).then(function(t) {
                      e.logger.info("_getLocalAnswer(), created local SDP: \n" + t.sdp);
                      var n = {
                          type: t.type,
                          sdp: t.sdp
                      };
                      return n = g.PCFactory.get().addBandwidthParams(n), n = _.SDPMuggle.removeDoublePT(n), n = _.SDPMuggle.fixVideoRecieve(n, e._call.settings.videoDirections.receiveVideo), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (n = _.SDPMuggle.removeTransportCC(n)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (n = _.SDPMuggle.addXAS(n)), e.codecRearrange(n)
                  }).then(function(t) {
                      return e.srcLocalSDP = t.sdp, e.logger.info("_getLocalAnswer(), set local SDP: \n" + t.sdp), e.impl.setLocalDescription(t)
                  }).then(function() {
                      t({
                          type: l.answer,
                          sdp: e.impl.localDescription.sdp
                      })
                  }).catch(function(e) {
                      n(e)
                  })
              })
          }
      }, {
          key: "_setRemoteDescription",
          value: function(e) {
              if (0 === e.length && this._call) return this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              });
              var t = new RTCSessionDescription({
                  sdp: e,
                  type: l.offer
              });
              return t = _.SDPMuggle.removeTIAS(t), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (t = _.SDPMuggle.removeTransportCC(t)), this.srcRemoteSDP = e, this.logger.info("_setRemoteDescription(), set remote SDP: \n" + t.sdp), this.impl.setRemoteDescription(t)
          }
      }, {
          key: "_processRemoteOffer",
          value: function(e) {
              var t = this;
              return 0 === e.length && this._call ? (this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              })) : (this.iceRole = T.controlled, new Promise(function(n, r) {
                  var i = new RTCSessionDescription({
                      sdp: e,
                      type: l.offer
                  });
                  E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (i = _.SDPMuggle.removeTransportCC(i)), t.srcRemoteSDP = e, i = _.SDPMuggle.removeTIAS(i), i = _.SDPMuggle.fixFFMIDBug(i), t.logger.info("_processRemoteOffer(), set remote SDP: \n" + i.sdp), t.impl.setRemoteDescription(i).then(function() {
                      var e = {
                          mandatory: t.getReceiveOptions()
                      };
                      return t.impl.createAnswer(e)
                  }).then(function(e) {
                      return t.logger.info("_processRemoteOffer(), created local SDP: \n" + e.sdp), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (e = _.SDPMuggle.removeTransportCC(e)), e = _.SDPMuggle.removeDoublePT(e), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (e = _.SDPMuggle.addXAS(e)), t.codecRearrange(e)
                  }).then(function(e) {
                      return t.srcLocalSDP = e.sdp, t.logger.info("_processRemoteOffer(), set local SDP: \n" + e.sdp), t.impl.setLocalDescription(e)
                  }).then(function() {
                      n(t.impl.localDescription.sdp)
                  }).catch(function(e) {
                      r(e)
                  })
              }))
          }
      }, {
          key: "_close",
          value: function() {
              var e = this;
              clearInterval(this.rtcCollectingCycle), this.impl.onnegotiationneeded = null;
              E.Client.getInstance().config();
              this.impl.removeTrack ? (this.rtpSenders.forEach(function(t) {
                  e.impl.removeTrack(t)
              }), M.default.StreamManager.get().remCallStream(this._call)) : (M.default.StreamManager.get().remCallStream(this._call), this.impl.getLocalStreams().forEach(function(t) {
                  e.impl.removeStream(t)
              })), this.impl.close(), void 0 !== this._call && C.CallstatsIo.get().sendFabricEvent(this.impl, C.CallstatsIoFabricEvent.fabricTerminated, this._call.id()), this._localStream = null, this._remoteStreams = null
          }
      }, {
          key: "_addRemoteCandidate",
          value: function(e, t) {
              var n = this;
              return new Promise(function(r, i) {
                  try {
                      n.impl.addIceCandidate(new RTCIceCandidate({
                          candidate: e.substring(2),
                          sdpMLineIndex: t
                      })).then(function() {
                          r()
                      }).catch(function() {
                          r()
                      })
                  } catch (e) {
                      r()
                  }
              })
          }
      }, {
          key: "_handleReinvite",
          value: function(e, t) {
              var n = this;
              return 0 === t.length && this._call ? (this.logger.error("Empty SDP from server. Call will be terminated."), void this._call.hangup({
                  "X-WebRTCError": "no sdp"
              })) : new Promise(function(r, i) {
                  if (n.banReinviteAnswer && i(new Error), !1 === n.renegotiationInProgress) {
                      n.renegotiationInProgress = !0;
                      var o = {
                          sdp: t,
                          type: l.offer
                      };
                      E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (o = _.SDPMuggle.removeTransportCC(o)), n.srcRemoteSDP = t, o = _.SDPMuggle.removeTIAS(o), n.logger.info("_handleReinvite(), set remote SDP: \n" + o.sdp), n.impl.setRemoteDescription(o).then(function() {
                          var t = {
                              mandatory: n.getReceiveOptions()
                          };
                          n.impl.createAnswer(t).then(function(t) {
                              n.logger.info("_handleReinvite(), created local SDP: \n" + t.sdp);
                              var o = {
                                  type: t.type,
                                  sdp: t.sdp
                              };
                              o = _.SDPMuggle.removeDoubleOpus(o), o = _.SDPMuggle.removeDoublePT(o), o = _.SDPMuggle.fixVideoRecieve(o, n.videoEnabled.receiveVideo), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (o = _.SDPMuggle.removeTransportCC(o)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (o = _.SDPMuggle.addXAS(o)), n.srcLocalSDP = o.sdp;
                              try {
                                  n.logger.info("_handleReinvite(), set local SDP: \n" + o.sdp), n.impl.setLocalDescription(o).then(function() {
                                      var t = {
                                          tracks: n.getTrackKind()
                                      };
                                      p.VoxSignaling.get().callRemoteFunction(h.RemoteFunction.acceptReInvite, n._call.id(), e, n.impl.localDescription.sdp, t), n.renegotiationInProgress = !1, n._call.dispatchEvent({
                                          name: y.CallEvents.Updated,
                                          result: !0,
                                          call: n._call
                                      }), n.updateHoldState(), setTimeout(function(e) {
                                          return n._fixTransreceiver()
                                      }, 0), r()
                                  })
                              } catch (e) {
                                  n.renegotiationInProgress = !1, setTimeout(function(e) {
                                      return n._fixTransreceiver()
                                  }, 0), i(e)
                              }
                          })
                      })
                  } else if (!0 === n.renegotiationInProgress) {
                      var a = {
                          sdp: t,
                          type: l.answer
                      };
                      n.renegotiationInProgress = !1, E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.removeTransportCC && (a = _.SDPMuggle.removeTransportCC(a)), E.Client.getInstance().config().experiments && E.Client.getInstance().config().experiments.xas && (a = _.SDPMuggle.addXAS(a)), n.srcRemoteSDP = t, a = _.SDPMuggle.removeTIAS(a), n.logger.info("_handleReinvite(), set local SDP: \n" + n.pendingOffer.sdp), n.impl.setLocalDescription(n.pendingOffer).then(function() {
                          try {
                              n.logger.info("_handleReinvite(), set remote SDP: \n" + a.sdp), n.impl.setRemoteDescription(a).then(function() {
                                  n._call.dispatchEvent({
                                      name: y.CallEvents.Updated,
                                      result: !0,
                                      call: n._call
                                  }), n.updateHoldState(), setTimeout(function(e) {
                                      return n._fixTransreceiver()
                                  }, 0), r()
                              })
                          } catch (e) {
                              n._call.dispatchEvent({
                                  name: y.CallEvents.Updated,
                                  result: !1,
                                  call: n._call
                              }), n.renegotiationInProgress = !1, n.logger.error(JSON.stringify(e)), setTimeout(function(e) {
                                  return n._fixTransreceiver()
                              }, 0), i(e)
                          }
                          clearTimeout(n.renegotiationTimer)
                      })
                  } else i(new Error("Universe was broken!"))
              })
          }
      }, {
          key: "_fixTransreceiver",
          value: function() {
              this.impl && this.impl.getTransceivers && this.impl.getTransceivers().forEach(function(e) {
                  "inactive" === e.currentDirection && e.receiver.track && !e.sender.track && e.receiver.track.onended && (e.receiver.track.stop(), e.receiver.track.onended(null))
              })
          }
      }, {
          key: "codecRearrange",
          value: function(e) {
              var t = this;
              return new Promise(function(n, r) {
                  var i = v.CallManager.get().calls[t.id];
                  if (void 0 !== i) {
                      var o = new m.CodecSorter(e.sdp),
                          a = o.getUserCodecList();
                      void 0 !== i.rearangeCodecs ? i.rearangeCodecs(a, i.settings.incoming).then(function(t) {
                          o.setUserCodecList(t), n({
                              type: e.type,
                              sdp: o.getSDP()
                          })
                      }, function(e) {
                          t.logger.error(JSON.stringify(e)), r(e)
                      }) : (o.setUserCodecList(a), t.logger.info("No sdp codecs transformer registered"), n({
                          type: e.type,
                          sdp: o.getSDP()
                      }))
                  } else n(e)
              })
          }
      }, {
          key: "_sendDTMF",
          value: function(e, t, n) {
              void 0 !== this.dtmfSender && this.dtmfSender.insertDTMF(e, t, n)
          }
      }, {
          key: "_hold",
          value: function(e) {
              C.CallstatsIo.get().sendFabricEvent(this.impl, e ? C.CallstatsIoFabricEvent.fabricHold : C.CallstatsIoFabricEvent.fabricResume, this._call.id()), this.onHold = e, this.impl.getTransceivers().forEach(function(t) {
                  t.direction = e ? "sendonly" : "sendrecv"
              })
          }
      }, {
          key: "_getDirections",
          value: function() {
              var e = {};
              return e.local = _.SDPMuggle.detectDirections(this.impl.localDescription.sdp), e.remote = _.SDPMuggle.detectDirections(this.impl.remoteDescription.sdp), e
          }
      }, {
          key: "_getStreamActivity",
          value: function() {
              var e = {};
              return e.local = this.getMediaActivity(this.impl.getLocalStreams()), e.remote = this.getMediaActivity(this.impl.getRemoteStreams()), e
          }
      }, {
          key: "getMediaActivity",
          value: function(e) {
              return e.map(function(e) {
                  return e.getTracks().map(function(e) {
                      return {
                          id: e.id,
                          kind: e.kind,
                          mutted: e.muted,
                          active: e.enabled,
                          label: e.label
                      }
                  })
              })
          }
      }, {
          key: "_hdnFRSPrep",
          value: function() {
              this.banReinviteAnswer = !0
          }
      }, {
          key: "_hdnFRS",
          value: function() {
              this.renegotiationInProgress = !1, this.onRenegotiation()
          }
      }, {
          key: "_traceName",
          value: function() {
              return "TransreceiverPC"
          }
      }, {
          key: "hasLocalAudio",
          value: function() {
              return this.impl.getLocalStreams().some(function(e) {
                  return !!e.getAudioTracks().length
              })
          }
      }, {
          key: "hasLocalVideo",
          value: function() {
              var e = this;
              return this.impl.getLocalStreams().some(function(t) {
                  return t.getVideoTracks().some(function(t) {
                      return !e.shareScreenMedia || !e.shareScreenMedia.some(function(e) {
                          return e.getTracks().some(function(e) {
                              return e.id === t.id
                          })
                      })
                  })
              })
          }
      }, {
          key: "enableVideo",
          value: function(e) {
              var t = [];
              this._call && (t = M.default.StreamManager.get()._getScreenSharing(this._call) || []);
              var n = [];
              t.forEach(function(e) {
                  return e.stream.getTracks().forEach(function(e) {
                      return n.push(e.id)
                  })
              }), this.impl.getLocalStreams().forEach(function(t) {
                  t.getVideoTracks().forEach(function(t) {
                      n.some(function(e) {
                          return t.id === e
                      }) || (t.enabled = e)
                  })
              })
          }
      }, {
          key: "getTransceivers",
          value: function() {
              return this.impl.getTransceivers ? this.impl.getTransceivers() : []
          }
      }, {
          key: "getRemoteDescription",
          value: function() {
              return this.impl.remoteDescription && this.impl.remoteDescription.sdp ? this.impl.remoteDescription.sdp : ""
          }
      }, {
          key: "_addCustomMedia",
          value: function(e) {
              var t = this;
              if (e && "closed" !== this.impl.signalingState && ("firefox" === d.default.getWSVendor() ? e.getTracks().forEach(function(e) {
                      var n = new MediaStream([e]);
                      t.rtpSenders.push(t.impl.addTrack(e, n)), t.onRenegotiation()
                  }) : this.impl.addStream(e), !this.dtmfSender && this._call)) {
                  var n = d.default.getDTMFSender(this.impl, this._call.id());
                  n && (this.dtmfSender = n)
              }
          }
      }, {
          key: "_removeCustomMedia",
          value: function(e) {
              var t = this;
              if (e)
                  if ("firefox" === d.default.getWSVendor())
                      if (this.impl.getTransceivers) {
                          var n = this.impl.getTransceivers();
                          n.forEach(function(t) {
                              e.getTracks().find(function(e) {
                                  return e.id === t.sender.track.id
                              }) && t.stop()
                          })
                      } else this.impl.getSenders().forEach(function(n) {
                          -1 !== e.getTracks().indexOf(n.track) && t.impl.removeTrack(n)
                      });
              else this.impl.removeStream(e)
          }
      }, {
          key: "_updateCustomMedia",
          value: function(e) {
              var t = this;
              e && "closed" !== this.impl.signalingState && e.getTracks().forEach(function(e) {
                  var n = t.impl.getSenders().find(function(t) {
                      return t.track && t.track.kind === e.kind
                  });
                  n && n.replaceTrack(e)
              })
          }
      }, {
          key: "_fixFFSoundBug",
          value: function() {
              var e = this;
              "firefox" === d.default.getWSVendor() && g.PCFactory.hasTransceivers && setTimeout(function() {
                  if (e.impl.getSenders) {
                      e.impl.getSenders().forEach(function(e) {
                          if (e.replaceTrack) {
                              var t = e.track;
                              e.replaceTrack(t)
                          }
                      })
                  }
              }, 1e3)
          }
      }, {
          key: "getConfiguration",
          value: function() {
              return this.impl ? this.impl.getConfiguration() : null
          }
      }, {
          key: "setConfiguration",
          value: function(e) {
              var t = this;
              this.impl && setTimeout(function() {
                  if (t.srcRemoteSDP && -1 === t.srcRemoteSDP.indexOf("VIMS"))
                      if (t.impl && t.impl.setConfiguration) t.impl.setConfiguration(e), t.renegotiationInProgress = !1, t._runReinvite(!0);
                      else if (t._pendingOffer) {
                      var n = [];
                      t.impl.getTransceivers().map(function(e) {
                          e.sender.track && n.push(e.sender.track)
                      }), t._createImpl(e), n.forEach(function(e) {
                          t.impl.addTrack(e, new MediaStream([e]))
                      }), t.impl.createOffer().then(function(e) {
                          return t.logger.info("setConfiguration(), created local SDP: \n" + e.sdp), t._needIceRestart = !0, t.logger.info("setConfiguration(), set local SDP: \n" + t._pendingOffer.sdp), t.impl.setLocalDescription(t._pendingOffer)
                      }).then(function() {
                          t._pendingOffer = void 0
                      }).catch(function(e) {
                          console.error(e)
                      })
                  }
              }, 800)
          }
      }]), t
  }(u.PeerConnection);
  c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_createImpl", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onSignalingStateChange", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getPCStats", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onConnectionChange", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onRenegotiation", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalOfferRegular", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getReceiveOptions", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "updateHoldState", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onICECandidate", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onAddTrack", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "onAddStream", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_processRemoteAnswer", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalOffer", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalOfferFF", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getLocalAnswer", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_setRemoteDescription", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_close", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_addRemoteCandidate", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_handleReinvite", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "codecRearrange", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_sendDTMF", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_hold", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_getStreamActivity", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getMediaActivity", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_hdnFRSPrep", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_hdnFRS", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "hasLocalAudio", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "hasLocalVideo", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "enableVideo", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_addCustomMedia", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_removeCustomMedia", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_updateCustomMedia", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "_fixFFSoundBug", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "getConfiguration", null), c([f.LogManager.d_trace(f.LogCategory.RTC)], k.prototype, "setConfiguration", null), t.TransreceiverPC = k
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(14),
      a = n(6),
      s = n(2),
      c = n(3),
      l = n(13),
      u = n(11),
      d = n(5),
      g = n(4),
      f = function() {
          function e(t) {
              var n = this;
              r(this, e), this.client = t, this.currentCall = null, this.onConnectionFailed = null, this.onConnectionEstablished = null, this.onCheckComplete = null, this.onCallFailed = null, this.onCallConnected = null, this.onCallEnded = null, this.onCallRinging = null, this.onCallMediaStarted = null, this.onVoicemail = null, this.onNetStatsReceived = null, a.CallManager.get().protocolVersion, t.on(o.Events.ConnectionFailed, function(e) {
                  return n.runLegacyCallback(n.onConnectionFailed, e)
              }), t.on(o.Events.ConnectionEstablished, function(e) {
                  return n.runLegacyCallback(n.onConnectionEstablished, e)
              }), s.VoxSignaling.get().setRPCHandler(l.RemoteEvent.handlePreFlightCheckResult, function(e, t, r) {
                  return n.onCheckComplete(e, t, r)
              }), s.VoxSignaling.get().setRPCHandler(l.RemoteEvent.handleVoicemail, function(e) {
                  return n.runLegacyCallback(n.onVoicemail, e)
              })
          }
          return i(e, [{
              key: "connectTo",
              value: function(e, t, n, r) {
                  var i = s.VoxSignaling.get();
                  u.Authenticator.get().ziAuthorized(!0), i.lagacyConnectTo(e, t, n, r)
              }
          }, {
              key: "connect",
              value: function() {}
          }, {
              key: "requestMedia",
              value: function(e, t, n, r) {
                  g.default.StreamManager.get().getCallStream(void 0).then(function(e) {
                      t && t(e)
                  }).catch(function(e) {
                      n && n(e)
                  })
              }
          }, {
              key: "hangupCall",
              value: function(e, t) {
                  a.CallManager.get().calls[e].hangup(t), s.VoxSignaling.get().callRemoteFunction(c.RemoteFunction.disconnectCall, e, {})
              }
          }, {
              key: "callTo",
              value: function(e, t, n, r) {
                  return this.currentCall = this.client.call({
                      number: e,
                      video: t,
                      extraHeaders: n,
                      extraParams: r
                  }), this.bindCurrentCall(), this.currentCall.id()
              }
          }, {
              key: "voicemailPromptFinished",
              value: function(e) {
                  s.VoxSignaling.get().callRemoteFunction(c.RemoteFunction.zPromptFinished, e)
              }
          }, {
              key: "makeid",
              value: function(e) {
                  for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; r < e; r++) t += n.charAt(Math.floor(Math.random() * n.length));
                  return t
              }
          }, {
              key: "muteMicrophone",
              value: function(e) {
                  var t = a.CallManager.get();
                  for (var n in t.calls) t.calls.hasOwnProperty(n) && (e ? t.calls[n].muteMicrophone() : t.calls[n].unmuteMicrophone())
              }
          }, {
              key: "sendDigit",
              value: function(e, t) {
                  s.VoxSignaling.get().callRemoteFunction(c.RemoteFunction.sendDTMF, e, t)
              }
          }, {
              key: "startPreFlightCheck",
              value: function(e, t) {
                  this.onCheckComplete && this.onCheckComplete(!0, !0, !0)
              }
          }, {
              key: "runLegacyCallback",
              value: function(e, t) {
                  void 0 !== e && null !== e && e(t)
              }
          }, {
              key: "bindCurrentCall",
              value: function() {
                  var e = this;
                  window.currentCall = this.currentCall, this.currentCall.on(d.CallEvents.Failed, function(t) {
                      e.runLegacyCallback(e.onCallFailed, t), e.unbindCurrentCall()
                  }), this.currentCall.on(d.CallEvents.Connected, function(t) {
                      e.runLegacyCallback(e.onCallConnected, t), e.runLegacyCallback(e.onCallMediaStarted, t);
                      a.CallManager.get();
                      setTimeout(function() {
                          var e = document.getElementById(window.currentCall.peerConnection.impl.getRemoteStreams()[0].getTracks()[0].id);
                          e.srcObject = window.currentCall.peerConnection.impl.getRemoteStreams()[0], e.load(), e.play()
                      }, 1e3)
                  }), this.currentCall.on(d.CallEvents.Disconnected, function(t) {
                      e.runLegacyCallback(e.onCallEnded, t), e.unbindCurrentCall()
                  }), this.client.on(o.Events.NetStatsReceived, function(t) {
                      return e.onNetStatsReceived(t)
                  })
              }
          }, {
              key: "unbindCurrentCall",
              value: function() {
                  this.currentCall.off(d.CallEvents.Failed), this.currentCall.off(d.CallEvents.Connected), this.currentCall.off(d.CallEvents.Disconnected), this.currentCall.off(d.CallEvents.ProgressToneStart), this.currentCall.off(d.CallEvents.Connected), this.client.off(o.Events.NetStatsReceived)
              }
          }, {
              key: "_traceName",
              value: function() {
                  return "ZingayaAPI"
              }
          }]), e
      }();
  t.ZingayaAPI = f
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var i = function() {
      function e(e, t) {
          for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
      }
      return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
      }
  }();
  Object.defineProperty(t, "__esModule", {
      value: !0
  });
  var o = n(2),
      a = n(3),
      s = function() {
          function e() {
              r(this, e)
          }
          return i(e, [{
              key: "_traceName",
              value: function() {
                  return "PushService"
              }
          }], [{
              key: "register",
              value: function(e) {
                  return new Promise(function(t, n) {
                      o.VoxSignaling.get().callRemoteFunction(a.RemoteFunction.registerPushToken, e) ? t() : n()
                  })
              }
          }, {
              key: "unregister",
              value: function(e) {
                  return new Promise(function(t, n) {
                      o.VoxSignaling.get().callRemoteFunction(a.RemoteFunction.unregisterPushToken, e) ? t() : n()
                  })
              }
          }, {
              key: "incomingPush",
              value: function(e) {
                  return new Promise(function(t, n) {
                      o.VoxSignaling.get().callRemoteFunction(a.RemoteFunction.pushFeedback, e) ? t() : n()
                  })
              }
          }]), e
      }();
  t.PushService = s
}, function(e, t, n) {
  "use strict";
  (function(t) {
      var r = n(68);
      e.exports = r({
          window: t.window
      })
  }).call(t, n(67))
}, function(e, t) {
  var n;
  n = function() {
      return this
  }();
  try {
      n = n || Function("return this")() || (0, eval)("this")
  } catch (e) {
      "object" == typeof window && (n = window)
  }
  e.exports = n
}, function(e, t, n) {
  "use strict";
  var r = n(9);
  e.exports = function(e, t) {
      var i = e && e.window,
          o = {
              shimChrome: !0,
              shimFirefox: !0,
              shimEdge: !0,
              shimSafari: !0
          };
      for (var a in t) hasOwnProperty.call(t, a) && (o[a] = t[a]);
      var s = r.log,
          c = r.detectBrowser(i),
          l = {
              browserDetails: c,
              extractVersion: r.extractVersion,
              disableLog: r.disableLog,
              disableWarnings: r.disableWarnings
          },
          u = n(69) || null,
          d = n(71) || null,
          g = n(74) || null,
          f = n(76) || null,
          p = n(77) || null;
      switch (c.browser) {
          case "chrome":
              if (!u || !u.shimPeerConnection || !o.shimChrome) return s("Chrome shim is not included in this adapter release."), l;
              s("adapter.js shimming chrome."), l.browserShim = u, p.shimCreateObjectURL(i), u.shimGetUserMedia(i), u.shimMediaStream(i), u.shimSourceObject(i), u.shimPeerConnection(i), u.shimOnTrack(i), u.shimAddTrackRemoveTrack(i), u.shimGetSendersWithDtmf(i), p.shimRTCIceCandidate(i);
              break;
          case "firefox":
              if (!g || !g.shimPeerConnection || !o.shimFirefox) return s("Firefox shim is not included in this adapter release."), l;
              s("adapter.js shimming firefox."), l.browserShim = g, p.shimCreateObjectURL(i), g.shimGetUserMedia(i), g.shimSourceObject(i), g.shimPeerConnection(i), g.shimOnTrack(i), g.shimRemoveStream(i), p.shimRTCIceCandidate(i);
              break;
          case "edge":
              if (!d || !d.shimPeerConnection || !o.shimEdge) return s("MS edge shim is not included in this adapter release."), l;
              s("adapter.js shimming edge."), l.browserShim = d, p.shimCreateObjectURL(i), d.shimGetUserMedia(i), d.shimPeerConnection(i), d.shimReplaceTrack(i);
              break;
          case "safari":
              if (!f || !o.shimSafari) return s("Safari shim is not included in this adapter release."), l;
              s("adapter.js shimming safari."), l.browserShim = f, p.shimCreateObjectURL(i), f.shimRTCIceServerUrls(i), f.shimCallbacksAPI(i), f.shimLocalStreamsAPI(i), f.shimRemoteStreamsAPI(i), f.shimTrackEventTransceiver(i), f.shimGetUserMedia(i), f.shimCreateOfferLegacy(i), p.shimRTCIceCandidate(i);
              break;
          default:
              s("Unsupported browser!")
      }
      return l
  }
}, function(e, t, n) {
  "use strict";
  var r = n(9),
      i = r.log,
      o = {
          shimMediaStream: function(e) {
              e.MediaStream = e.MediaStream || e.webkitMediaStream
          },
          shimOnTrack: function(e) {
              if ("object" == typeof e && e.RTCPeerConnection && !("ontrack" in e.RTCPeerConnection.prototype)) {
                  Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                      get: function() {
                          return this._ontrack
                      },
                      set: function(e) {
                          this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e)
                      }
                  });
                  var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                  e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                      var n = this;
                      return n._ontrackpoly || (n._ontrackpoly = function(t) {
                          t.stream.addEventListener("addtrack", function(r) {
                              var i;
                              i = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
                                  return e.track && e.track.id === r.track.id
                              }) : {
                                  track: r.track
                              };
                              var o = new Event("track");
                              o.track = r.track, o.receiver = i, o.transceiver = {
                                  receiver: i
                              }, o.streams = [t.stream], n.dispatchEvent(o)
                          }), t.stream.getTracks().forEach(function(r) {
                              var i;
                              i = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
                                  return e.track && e.track.id === r.id
                              }) : {
                                  track: r
                              };
                              var o = new Event("track");
                              o.track = r, o.receiver = i, o.transceiver = {
                                  receiver: i
                              }, o.streams = [t.stream], n.dispatchEvent(o)
                          })
                      }, n.addEventListener("addstream", n._ontrackpoly)), t.apply(n, arguments)
                  }
              }
          },
          shimGetSendersWithDtmf: function(e) {
              if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
                  var t = function(e, t) {
                      return {
                          track: t,
                          get dtmf() {
                              return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf
                          },
                          _pc: e
                      }
                  };
                  if (!e.RTCPeerConnection.prototype.getSenders) {
                      e.RTCPeerConnection.prototype.getSenders = function() {
                          return this._senders = this._senders || [], this._senders.slice()
                      };
                      var n = e.RTCPeerConnection.prototype.addTrack;
                      e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                          var i = this,
                              o = n.apply(i, arguments);
                          return o || (o = t(i, e), i._senders.push(o)), o
                      };
                      var r = e.RTCPeerConnection.prototype.removeTrack;
                      e.RTCPeerConnection.prototype.removeTrack = function(e) {
                          var t = this;
                          r.apply(t, arguments);
                          var n = t._senders.indexOf(e); - 1 !== n && t._senders.splice(n, 1)
                      }
                  }
                  var i = e.RTCPeerConnection.prototype.addStream;
                  e.RTCPeerConnection.prototype.addStream = function(e) {
                      var n = this;
                      n._senders = n._senders || [], i.apply(n, [e]), e.getTracks().forEach(function(e) {
                          n._senders.push(t(n, e))
                      })
                  };
                  var o = e.RTCPeerConnection.prototype.removeStream;
                  e.RTCPeerConnection.prototype.removeStream = function(e) {
                      var t = this;
                      t._senders = t._senders || [], o.apply(t, [e]), e.getTracks().forEach(function(e) {
                          var n = t._senders.find(function(t) {
                              return t.track === e
                          });
                          n && t._senders.splice(t._senders.indexOf(n), 1)
                      })
                  }
              } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
                  var a = e.RTCPeerConnection.prototype.getSenders;
                  e.RTCPeerConnection.prototype.getSenders = function() {
                      var e = this,
                          t = a.apply(e, []);
                      return t.forEach(function(t) {
                          t._pc = e
                      }), t
                  }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                      get: function() {
                          return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf
                      }
                  })
              }
          },
          shimSourceObject: function(e) {
              var t = e && e.URL;
              "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                  get: function() {
                      return this._srcObject
                  },
                  set: function(e) {
                      var n = this;
                      if (this._srcObject = e, this.src && t.revokeObjectURL(this.src), !e) return void(this.src = "");
                      this.src = t.createObjectURL(e), e.addEventListener("addtrack", function() {
                          n.src && t.revokeObjectURL(n.src), n.src = t.createObjectURL(e)
                      }), e.addEventListener("removetrack", function() {
                          n.src && t.revokeObjectURL(n.src), n.src = t.createObjectURL(e)
                      })
                  }
              }))
          },
          shimAddTrackRemoveTrack: function(e) {
              function t(e, t) {
                  var n = t.sdp;
                  return Object.keys(e._reverseStreams || []).forEach(function(t) {
                      var r = e._reverseStreams[t],
                          i = e._streams[r.id];
                      n = n.replace(new RegExp(i.id, "g"), r.id)
                  }), new RTCSessionDescription({
                      type: t.type,
                      sdp: n
                  })
              }

              function n(e, t) {
                  var n = t.sdp;
                  return Object.keys(e._reverseStreams || []).forEach(function(t) {
                      var r = e._reverseStreams[t],
                          i = e._streams[r.id];
                      n = n.replace(new RegExp(r.id, "g"), i.id)
                  }), new RTCSessionDescription({
                      type: t.type,
                      sdp: n
                  })
              }
              var i = r.detectBrowser(e);
              if (!(e.RTCPeerConnection.prototype.addTrack && i.version >= 64)) {
                  var o = e.RTCPeerConnection.prototype.getLocalStreams;
                  e.RTCPeerConnection.prototype.getLocalStreams = function() {
                      var e = this,
                          t = o.apply(this);
                      return e._reverseStreams = e._reverseStreams || {}, t.map(function(t) {
                          return e._reverseStreams[t.id]
                      })
                  };
                  var a = e.RTCPeerConnection.prototype.addStream;
                  e.RTCPeerConnection.prototype.addStream = function(t) {
                      var n = this;
                      if (n._streams = n._streams || {}, n._reverseStreams = n._reverseStreams || {}, t.getTracks().forEach(function(e) {
                              if (n.getSenders().find(function(t) {
                                      return t.track === e
                                  })) throw new DOMException("Track already exists.", "InvalidAccessError")
                          }), !n._reverseStreams[t.id]) {
                          var r = new e.MediaStream(t.getTracks());
                          n._streams[t.id] = r, n._reverseStreams[r.id] = t, t = r
                      }
                      a.apply(n, [t])
                  };
                  var s = e.RTCPeerConnection.prototype.removeStream;
                  e.RTCPeerConnection.prototype.removeStream = function(e) {
                      var t = this;
                      t._streams = t._streams || {}, t._reverseStreams = t._reverseStreams || {}, s.apply(t, [t._streams[e.id] || e]), delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id : e.id], delete t._streams[e.id]
                  }, e.RTCPeerConnection.prototype.addTrack = function(t, n) {
                      var r = this;
                      if ("closed" === r.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                      var i = [].slice.call(arguments, 1);
                      if (1 !== i.length || !i[0].getTracks().find(function(e) {
                              return e === t
                          })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                      if (r.getSenders().find(function(e) {
                              return e.track === t
                          })) throw new DOMException("Track already exists.", "InvalidAccessError");
                      r._streams = r._streams || {}, r._reverseStreams = r._reverseStreams || {};
                      var o = r._streams[n.id];
                      if (o) o.addTrack(t), Promise.resolve().then(function() {
                          r.dispatchEvent(new Event("negotiationneeded"))
                      });
                      else {
                          var a = new e.MediaStream([t]);
                          r._streams[n.id] = a, r._reverseStreams[a.id] = n, r.addStream(a)
                      }
                      return r.getSenders().find(function(e) {
                          return e.track === t
                      })
                  }, ["createOffer", "createAnswer"].forEach(function(n) {
                      var r = e.RTCPeerConnection.prototype[n];
                      e.RTCPeerConnection.prototype[n] = function() {
                          var e = this,
                              n = arguments;
                          return arguments.length && "function" == typeof arguments[0] ? r.apply(e, [function(r) {
                              var i = t(e, r);
                              n[0].apply(null, [i])
                          }, function(e) {
                              n[1] && n[1].apply(null, e)
                          }, arguments[2]]) : r.apply(e, arguments).then(function(n) {
                              return t(e, n)
                          })
                      }
                  });
                  var c = e.RTCPeerConnection.prototype.setLocalDescription;
                  e.RTCPeerConnection.prototype.setLocalDescription = function() {
                      var e = this;
                      return arguments.length && arguments[0].type ? (arguments[0] = n(e, arguments[0]), c.apply(e, arguments)) : c.apply(e, arguments)
                  };
                  var l = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
                  Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
                      get: function() {
                          var e = this,
                              n = l.get.apply(this);
                          return "" === n.type ? n : t(e, n)
                      }
                  }), e.RTCPeerConnection.prototype.removeTrack = function(e) {
                      var t = this;
                      if ("closed" === t.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                      if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                      if (e._pc !== t) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                      t._streams = t._streams || {};
                      var n;
                      Object.keys(t._streams).forEach(function(r) {
                          t._streams[r].getTracks().find(function(t) {
                              return e.track === t
                          }) && (n = t._streams[r])
                      }), n && (1 === n.getTracks().length ? t.removeStream(t._reverseStreams[n.id]) : n.removeTrack(e.track), t.dispatchEvent(new Event("negotiationneeded")))
                  }
              }
          },
          shimPeerConnection: function(e) {
              var t = r.detectBrowser(e);
              if (e.RTCPeerConnection) {
                  var n = e.RTCPeerConnection;
                  e.RTCPeerConnection = function(e, t) {
                      if (e && e.iceServers) {
                          for (var i = [], o = 0; o < e.iceServers.length; o++) {
                              var a = e.iceServers[o];
                              !a.hasOwnProperty("urls") && a.hasOwnProperty("url") ? (r.deprecated("RTCIceServer.url", "RTCIceServer.urls"), a = JSON.parse(JSON.stringify(a)), a.urls = a.url, i.push(a)) : i.push(e.iceServers[o])
                          }
                          e.iceServers = i
                      }
                      return new n(e, t)
                  }, e.RTCPeerConnection.prototype = n.prototype, Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                      get: function() {
                          return n.generateCertificate
                      }
                  })
              } else e.RTCPeerConnection = function(t, n) {
                  return i("PeerConnection"), t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy), new e.webkitRTCPeerConnection(t, n)
              }, e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype, e.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                  get: function() {
                      return e.webkitRTCPeerConnection.generateCertificate
                  }
              });
              var o = e.RTCPeerConnection.prototype.getStats;
              e.RTCPeerConnection.prototype.getStats = function(e, t, n) {
                  var r = this,
                      i = arguments;
                  if (arguments.length > 0 && "function" == typeof e) return o.apply(this, arguments);
                  if (0 === o.length && (0 === arguments.length || "function" != typeof arguments[0])) return o.apply(this, []);
                  var a = function(e) {
                          var t = {};
                          return e.result().forEach(function(e) {
                              var n = {
                                  id: e.id,
                                  timestamp: e.timestamp,
                                  type: {
                                      localcandidate: "local-candidate",
                                      remotecandidate: "remote-candidate"
                                  } [e.type] || e.type
                              };
                              e.names().forEach(function(t) {
                                  n[t] = e.stat(t)
                              }), t[n.id] = n
                          }), t
                      },
                      s = function(e) {
                          return new Map(Object.keys(e).map(function(t) {
                              return [t, e[t]]
                          }))
                      };
                  if (arguments.length >= 2) {
                      var c = function(e) {
                          i[1](s(a(e)))
                      };
                      return o.apply(this, [c, arguments[0]])
                  }
                  return new Promise(function(e, t) {
                      o.apply(r, [function(t) {
                          e(s(a(t)))
                      }, t])
                  }).then(t, n)
              }, t.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                  var n = e.RTCPeerConnection.prototype[t];
                  e.RTCPeerConnection.prototype[t] = function() {
                      var e = arguments,
                          t = this,
                          r = new Promise(function(r, i) {
                              n.apply(t, [e[0], r, i])
                          });
                      return e.length < 2 ? r : r.then(function() {
                          e[1].apply(null, [])
                      }, function(t) {
                          e.length >= 3 && e[2].apply(null, [t])
                      })
                  }
              }), t.version < 52 && ["createOffer", "createAnswer"].forEach(function(t) {
                  var n = e.RTCPeerConnection.prototype[t];
                  e.RTCPeerConnection.prototype[t] = function() {
                      var e = this;
                      if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                          var t = 1 === arguments.length ? arguments[0] : void 0;
                          return new Promise(function(r, i) {
                              n.apply(e, [r, i, t])
                          })
                      }
                      return n.apply(this, arguments)
                  }
              }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                  var n = e.RTCPeerConnection.prototype[t];
                  e.RTCPeerConnection.prototype[t] = function() {
                      return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
                  }
              });
              var a = e.RTCPeerConnection.prototype.addIceCandidate;
              e.RTCPeerConnection.prototype.addIceCandidate = function() {
                  return arguments[0] ? a.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
              }
          }
      };
  e.exports = {
      shimMediaStream: o.shimMediaStream,
      shimOnTrack: o.shimOnTrack,
      shimAddTrackRemoveTrack: o.shimAddTrackRemoveTrack,
      shimGetSendersWithDtmf: o.shimGetSendersWithDtmf,
      shimSourceObject: o.shimSourceObject,
      shimPeerConnection: o.shimPeerConnection,
      shimGetUserMedia: n(70)
  }
}, function(e, t, n) {
  "use strict";
  var r = n(9),
      i = r.log;
  e.exports = function(e) {
      var t = r.detectBrowser(e),
          n = e && e.navigator,
          o = function(e) {
              if ("object" != typeof e || e.mandatory || e.optional) return e;
              var t = {};
              return Object.keys(e).forEach(function(n) {
                  if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                      var r = "object" == typeof e[n] ? e[n] : {
                          ideal: e[n]
                      };
                      void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                      var i = function(e, t) {
                          return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                      };
                      if (void 0 !== r.ideal) {
                          t.optional = t.optional || [];
                          var o = {};
                          "number" == typeof r.ideal ? (o[i("min", n)] = r.ideal, t.optional.push(o), o = {}, o[i("max", n)] = r.ideal, t.optional.push(o)) : (o[i("", n)] = r.ideal, t.optional.push(o))
                      }
                      void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function(e) {
                          void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
                      })
                  }
              }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
          },
          a = function(e, r) {
              if (t.version >= 61) return r(e);
              if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
                  var a = function(e, t, n) {
                      t in e && !(n in e) && (e[n] = e[t], delete e[t])
                  };
                  e = JSON.parse(JSON.stringify(e)), a(e.audio, "autoGainControl", "googAutoGainControl"), a(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = o(e.audio)
              }
              if (e && "object" == typeof e.video) {
                  var s = e.video.facingMode;
                  s = s && ("object" == typeof s ? s : {
                      ideal: s
                  });
                  var c = t.version < 66;
                  if (s && ("user" === s.exact || "environment" === s.exact || "user" === s.ideal || "environment" === s.ideal) && (!n.mediaDevices.getSupportedConstraints || !n.mediaDevices.getSupportedConstraints().facingMode || c)) {
                      delete e.video.facingMode;
                      var l;
                      if ("environment" === s.exact || "environment" === s.ideal ? l = ["back", "rear"] : "user" !== s.exact && "user" !== s.ideal || (l = ["front"]), l) return n.mediaDevices.enumerateDevices().then(function(t) {
                          t = t.filter(function(e) {
                              return "videoinput" === e.kind
                          });
                          var n = t.find(function(e) {
                              return l.some(function(t) {
                                  return -1 !== e.label.toLowerCase().indexOf(t)
                              })
                          });
                          return !n && t.length && -1 !== l.indexOf("back") && (n = t[t.length - 1]), n && (e.video.deviceId = s.exact ? {
                              exact: n.deviceId
                          } : {
                              ideal: n.deviceId
                          }), e.video = o(e.video), i("chrome: " + JSON.stringify(e)), r(e)
                      })
                  }
                  e.video = o(e.video)
              }
              return i("chrome: " + JSON.stringify(e)), r(e)
          },
          s = function(e) {
              return {
                  name: {
                      PermissionDeniedError: "NotAllowedError",
                      InvalidStateError: "NotReadableError",
                      DevicesNotFoundError: "NotFoundError",
                      ConstraintNotSatisfiedError: "OverconstrainedError",
                      TrackStartError: "NotReadableError",
                      MediaDeviceFailedDueToShutdown: "NotReadableError",
                      MediaDeviceKillSwitchOn: "NotReadableError"
                  } [e.name] || e.name,
                  message: e.message,
                  constraint: e.constraintName,
                  toString: function() {
                      return this.name + (this.message && ": ") + this.message
                  }
              }
          },
          c = function(e, t, r) {
              a(e, function(e) {
                  n.webkitGetUserMedia(e, t, function(e) {
                      r && r(s(e))
                  })
              })
          };
      n.getUserMedia = c;
      var l = function(e) {
          return new Promise(function(t, r) {
              n.getUserMedia(e, t, r)
          })
      };
      if (n.mediaDevices || (n.mediaDevices = {
              getUserMedia: l,
              enumerateDevices: function() {
                  return new Promise(function(t) {
                      var n = {
                          audio: "audioinput",
                          video: "videoinput"
                      };
                      return e.MediaStreamTrack.getSources(function(e) {
                          t(e.map(function(e) {
                              return {
                                  label: e.label,
                                  kind: n[e.kind],
                                  deviceId: e.id,
                                  groupId: ""
                              }
                          }))
                      })
                  })
              },
              getSupportedConstraints: function() {
                  return {
                      deviceId: !0,
                      echoCancellation: !0,
                      facingMode: !0,
                      frameRate: !0,
                      height: !0,
                      width: !0
                  }
              }
          }), n.mediaDevices.getUserMedia) {
          var u = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
          n.mediaDevices.getUserMedia = function(e) {
              return a(e, function(e) {
                  return u(e).then(function(t) {
                      if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                          e.stop()
                      }), new DOMException("", "NotFoundError");
                      return t
                  }, function(e) {
                      return Promise.reject(s(e))
                  })
              })
          }
      } else n.mediaDevices.getUserMedia = function(e) {
          return l(e)
      };
      void 0 === n.mediaDevices.addEventListener && (n.mediaDevices.addEventListener = function() {
          i("Dummy mediaDevices.addEventListener called.")
      }), void 0 === n.mediaDevices.removeEventListener && (n.mediaDevices.removeEventListener = function() {
          i("Dummy mediaDevices.removeEventListener called.")
      })
  }
}, function(e, t, n) {
  "use strict";
  var r = n(9),
      i = n(72);
  e.exports = {
      shimGetUserMedia: n(73),
      shimPeerConnection: function(e) {
          var t = r.detectBrowser(e);
          if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
                  return e
              }), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
                  return e
              }), t.version < 15025)) {
              var n = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
              Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
                  set: function(e) {
                      n.set.call(this, e);
                      var t = new Event("enabled");
                      t.enabled = e, this.dispatchEvent(t)
                  }
              })
          }!e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
              get: function() {
                  return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf
              }
          }), e.RTCPeerConnection = i(e, t.version)
      },
      shimReplaceTrack: function(e) {
          !e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
      }
  }
}, function(e, t, n) {
  "use strict";

  function r(e) {
      return {
          inboundrtp: "inbound-rtp",
          outboundrtp: "outbound-rtp",
          candidatepair: "candidate-pair",
          localcandidate: "local-candidate",
          remotecandidate: "remote-candidate"
      } [e.type] || e.type
  }

  function i(e, t, n, r, i) {
      var o = u.writeRtpDescription(e.kind, t);
      if (o += u.writeIceParameters(e.iceGatherer.getLocalParameters()), o += u.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : i || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
          var a = e.rtpSender._initialTrackId || e.rtpSender.track.id;
          e.rtpSender._initialTrackId = a;
          var s = "msid:" + (r ? r.id : "-") + " " + a + "\r\n";
          o += "a=" + s, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + s, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + s, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
      }
      return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + u.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + u.localCName + "\r\n"), o
  }

  function o(e, t) {
      var n = !1;
      return e = JSON.parse(JSON.stringify(e)), e.filter(function(e) {
          if (e && (e.urls || e.url)) {
              var r = e.urls || e.url;
              e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
              var i = "string" == typeof r;
              return i && (r = [r]), r = r.filter(function(e) {
                  return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf("turn:[") || n ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp") : (n = !0, !0)
              }), delete e.url, e.urls = i ? r[0] : r, !!r.length
          }
      })
  }

  function a(e, t) {
      var n = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: []
          },
          r = function(e, t) {
              e = parseInt(e, 10);
              for (var n = 0; n < t.length; n++)
                  if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
          },
          i = function(e, t, n, i) {
              var o = r(e.parameters.apt, n),
                  a = r(t.parameters.apt, i);
              return o && a && o.name.toLowerCase() === a.name.toLowerCase()
          };
      return e.codecs.forEach(function(r) {
          for (var o = 0; o < t.codecs.length; o++) {
              var a = t.codecs[o];
              if (r.name.toLowerCase() === a.name.toLowerCase() && r.clockRate === a.clockRate) {
                  if ("rtx" === r.name.toLowerCase() && r.parameters && a.parameters.apt && !i(r, a, e.codecs, t.codecs)) continue;
                  a = JSON.parse(JSON.stringify(a)), a.numChannels = Math.min(r.numChannels, a.numChannels), n.codecs.push(a), a.rtcpFeedback = a.rtcpFeedback.filter(function(e) {
                      for (var t = 0; t < r.rtcpFeedback.length; t++)
                          if (r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return !0;
                      return !1
                  });
                  break
              }
          }
      }), e.headerExtensions.forEach(function(e) {
          for (var r = 0; r < t.headerExtensions.length; r++) {
              var i = t.headerExtensions[r];
              if (e.uri === i.uri) {
                  n.headerExtensions.push(i);
                  break
              }
          }
      }), n
  }

  function s(e, t, n) {
      return -1 !== {
          offer: {
              setLocalDescription: ["stable", "have-local-offer"],
              setRemoteDescription: ["stable", "have-remote-offer"]
          },
          answer: {
              setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
              setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
          }
      } [t][e].indexOf(n)
  }

  function c(e, t) {
      var n = e.getRemoteCandidates().find(function(e) {
          return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
      });
      return n || e.addRemoteCandidate(t), !n
  }

  function l(e, t) {
      var n = new Error(t);
      return n.name = e, n.code = {
          NotSupportedError: 9,
          InvalidStateError: 11,
          InvalidAccessError: 15,
          TypeError: void 0,
          OperationError: void 0
      } [e], n
  }
  var u = n(43);
  e.exports = function(e, t) {
      function n(t, n) {
          n.addTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
              track: t
          }))
      }

      function d(t, n) {
          n.removeTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
              track: t
          }))
      }

      function g(t, n, r, i) {
          var o = new Event("track");
          o.track = n, o.receiver = r, o.transceiver = {
              receiver: r
          }, o.streams = i, e.setTimeout(function() {
              t._dispatchEvent("track", o)
          })
      }
      var f = function(n) {
          var r = this,
              i = document.createDocumentFragment();
          if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
                  r[e] = i[e].bind(i)
              }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this.localDescription = null, this.remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw l("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
          switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
              case "all":
              case "relay":
                  break;
              default:
                  n.iceTransportPolicy = "all"
          }
          switch (n.bundlePolicy) {
              case "balanced":
              case "max-compat":
              case "max-bundle":
                  break;
              default:
                  n.bundlePolicy = "balanced"
          }
          if (n.iceServers = o(n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize)
              for (var a = n.iceCandidatePoolSize; a > 0; a--) this._iceGatherers.push(new e.RTCIceGatherer({
                  iceServers: n.iceServers,
                  gatherPolicy: n.iceTransportPolicy
              }));
          else n.iceCandidatePoolSize = 0;
          this._config = n, this.transceivers = [], this._sdpSessionId = u.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1
      };
      f.prototype.onicecandidate = null, f.prototype.onaddstream = null, f.prototype.ontrack = null, f.prototype.onremovestream = null, f.prototype.onsignalingstatechange = null, f.prototype.oniceconnectionstatechange = null, f.prototype.onconnectionstatechange = null, f.prototype.onicegatheringstatechange = null, f.prototype.onnegotiationneeded = null, f.prototype.ondatachannel = null, f.prototype._dispatchEvent = function(e, t) {
          this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
      }, f.prototype._emitGatheringStateChange = function() {
          var e = new Event("icegatheringstatechange");
          this._dispatchEvent("icegatheringstatechange", e)
      }, f.prototype.getConfiguration = function() {
          return this._config
      }, f.prototype.getLocalStreams = function() {
          return this.localStreams
      }, f.prototype.getRemoteStreams = function() {
          return this.remoteStreams
      }, f.prototype._createTransceiver = function(e, t) {
          var n = this.transceivers.length > 0,
              r = {
                  track: null,
                  iceGatherer: null,
                  iceTransport: null,
                  dtlsTransport: null,
                  localCapabilities: null,
                  remoteCapabilities: null,
                  rtpSender: null,
                  rtpReceiver: null,
                  kind: e,
                  mid: null,
                  sendEncodingParameters: null,
                  recvEncodingParameters: null,
                  stream: null,
                  associatedRemoteMediaStreams: [],
                  wantReceive: !0
              };
          if (this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport, r.dtlsTransport = this.transceivers[0].dtlsTransport;
          else {
              var i = this._createIceAndDtlsTransports();
              r.iceTransport = i.iceTransport, r.dtlsTransport = i.dtlsTransport
          }
          return t || this.transceivers.push(r), r
      }, f.prototype.addTrack = function(t, n) {
          if (this._isClosed) throw l("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
          if (this.transceivers.find(function(e) {
                  return e.track === t
              })) throw l("InvalidAccessError", "Track already exists.");
          for (var r, i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (r = this.transceivers[i]);
          return r || (r = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(n) && this.localStreams.push(n), r.track = t, r.stream = n, r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport), r.rtpSender
      }, f.prototype.addStream = function(e) {
          var n = this;
          if (t >= 15025) e.getTracks().forEach(function(t) {
              n.addTrack(t, e)
          });
          else {
              var r = e.clone();
              e.getTracks().forEach(function(e, t) {
                  var n = r.getTracks()[t];
                  e.addEventListener("enabled", function(e) {
                      n.enabled = e.enabled
                  })
              }), r.getTracks().forEach(function(e) {
                  n.addTrack(e, r)
              })
          }
      }, f.prototype.removeTrack = function(t) {
          if (this._isClosed) throw l("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
          if (!(t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
          var n = this.transceivers.find(function(e) {
              return e.rtpSender === t
          });
          if (!n) throw l("InvalidAccessError", "Sender was not created by this connection.");
          var r = n.stream;
          n.rtpSender.stop(), n.rtpSender = null, n.track = null, n.stream = null, -1 === this.transceivers.map(function(e) {
              return e.stream
          }).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1), this._maybeFireNegotiationNeeded()
      }, f.prototype.removeStream = function(e) {
          var t = this;
          e.getTracks().forEach(function(e) {
              var n = t.getSenders().find(function(t) {
                  return t.track === e
              });
              n && t.removeTrack(n)
          })
      }, f.prototype.getSenders = function() {
          return this.transceivers.filter(function(e) {
              return !!e.rtpSender
          }).map(function(e) {
              return e.rtpSender
          })
      }, f.prototype.getReceivers = function() {
          return this.transceivers.filter(function(e) {
              return !!e.rtpReceiver
          }).map(function(e) {
              return e.rtpReceiver
          })
      }, f.prototype._createIceGatherer = function(t, n) {
          var r = this;
          if (n && t > 0) return this.transceivers[0].iceGatherer;
          if (this._iceGatherers.length) return this._iceGatherers.shift();
          var i = new e.RTCIceGatherer({
              iceServers: this._config.iceServers,
              gatherPolicy: this._config.iceTransportPolicy
          });
          return Object.defineProperty(i, "state", {
              value: "new",
              writable: !0
          }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function(e) {
              var n = !e.candidate || 0 === Object.keys(e.candidate).length;
              i.state = n ? "completed" : "gathering", null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t].bufferedCandidateEvents.push(e)
          }, i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), i
      }, f.prototype._gather = function(t, n) {
          var r = this,
              i = this.transceivers[n].iceGatherer;
          if (!i.onlocalcandidate) {
              var o = this.transceivers[n].bufferedCandidateEvents;
              this.transceivers[n].bufferedCandidateEvents = null, i.removeEventListener("localcandidate", this.transceivers[n].bufferCandidates), i.onlocalcandidate = function(e) {
                  if (!(r.usingBundle && n > 0)) {
                      var o = new Event("icecandidate");
                      o.candidate = {
                          sdpMid: t,
                          sdpMLineIndex: n
                      };
                      var a = e.candidate,
                          s = !a || 0 === Object.keys(a).length;
                      if (s) "new" !== i.state && "gathering" !== i.state || (i.state = "completed");
                      else {
                          "new" === i.state && (i.state = "gathering"), a.component = 1, a.ufrag = i.getLocalParameters().usernameFragment;
                          var c = u.writeCandidate(a);
                          o.candidate = Object.assign(o.candidate, u.parseCandidate(c)), o.candidate.candidate = c, o.candidate.toJSON = function() {
                              return {
                                  candidate: o.candidate.candidate,
                                  sdpMid: o.candidate.sdpMid,
                                  sdpMLineIndex: o.candidate.sdpMLineIndex,
                                  usernameFragment: o.candidate.usernameFragment
                              }
                          }
                      }
                      var l = u.getMediaSections(r.localDescription.sdp);
                      l[o.candidate.sdpMLineIndex] += s ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate + "\r\n", r.localDescription.sdp = u.getDescription(r.localDescription.sdp) + l.join("");
                      var d = r.transceivers.every(function(e) {
                          return e.iceGatherer && "completed" === e.iceGatherer.state
                      });
                      "gathering" !== r.iceGatheringState && (r.iceGatheringState = "gathering", r._emitGatheringStateChange()), s || r._dispatchEvent("icecandidate", o), d && (r._dispatchEvent("icecandidate", new Event("icecandidate")), r.iceGatheringState = "complete", r._emitGatheringStateChange())
                  }
              }, e.setTimeout(function() {
                  o.forEach(function(e) {
                      i.onlocalcandidate(e)
                  })
              }, 0)
          }
      }, f.prototype._createIceAndDtlsTransports = function() {
          var t = this,
              n = new e.RTCIceTransport(null);
          n.onicestatechange = function() {
              t._updateIceConnectionState(), t._updateConnectionState()
          };
          var r = new e.RTCDtlsTransport(n);
          return r.ondtlsstatechange = function() {
              t._updateConnectionState()
          }, r.onerror = function() {
              Object.defineProperty(r, "state", {
                  value: "failed",
                  writable: !0
              }), t._updateConnectionState()
          }, {
              iceTransport: n,
              dtlsTransport: r
          }
      }, f.prototype._disposeIceAndDtlsTransports = function(e) {
          var t = this.transceivers[e].iceGatherer;
          t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
          var n = this.transceivers[e].iceTransport;
          n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
          var r = this.transceivers[e].dtlsTransport;
          r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
      }, f.prototype._transceive = function(e, n, r) {
          var i = a(e.localCapabilities, e.remoteCapabilities);
          n && e.rtpSender && (i.encodings = e.sendEncodingParameters, i.rtcp = {
              cname: u.localCName,
              compound: e.rtcpParameters.compound
          }, e.recvEncodingParameters.length && (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(i)), r && e.rtpReceiver && i.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
              delete e.rtx
          }), e.recvEncodingParameters.length ? i.encodings = e.recvEncodingParameters : i.encodings = [{}], i.rtcp = {
              compound: e.rtcpParameters.compound
          }, e.rtcpParameters.cname && (i.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (i.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(i))
      }, f.prototype.setLocalDescription = function(e) {
          var t = this;
          if (-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(l("TypeError", 'Unsupported type "' + e.type + '"'));
          if (!s("setLocalDescription", e.type, t.signalingState) || t._isClosed) return Promise.reject(l("InvalidStateError", "Can not set local " + e.type + " in state " + t.signalingState));
          var n, r;
          if ("offer" === e.type) n = u.splitSections(e.sdp), r = n.shift(), n.forEach(function(e, n) {
              var r = u.parseRtpParameters(e);
              t.transceivers[n].localCapabilities = r
          }), t.transceivers.forEach(function(e, n) {
              t._gather(e.mid, n)
          });
          else if ("answer" === e.type) {
              n = u.splitSections(t.remoteDescription.sdp), r = n.shift();
              var i = u.matchPrefix(r, "a=ice-lite").length > 0;
              n.forEach(function(e, n) {
                  var o = t.transceivers[n],
                      s = o.iceGatherer,
                      c = o.iceTransport,
                      l = o.dtlsTransport,
                      d = o.localCapabilities,
                      g = o.remoteCapabilities;
                  if (!(u.isRejected(e) && 0 === u.matchPrefix(e, "a=bundle-only").length || o.rejected)) {
                      var f = u.getIceParameters(e, r),
                          p = u.getDtlsParameters(e, r);
                      i && (p.role = "server"), t.usingBundle && 0 !== n || (t._gather(o.mid, n), "new" === c.state && c.start(s, f, i ? "controlling" : "controlled"), "new" === l.state && l.start(p));
                      var v = a(d, g);
                      t._transceive(o, v.codecs.length > 0, !1)
                  }
              })
          }
          return t.localDescription = {
              type: e.type,
              sdp: e.sdp
          }, "offer" === e.type ? t._updateSignalingState("have-local-offer") : t._updateSignalingState("stable"), Promise.resolve()
      }, f.prototype.setRemoteDescription = function(r) {
          var i = this;
          if (-1 === ["offer", "answer"].indexOf(r.type)) return Promise.reject(l("TypeError", 'Unsupported type "' + r.type + '"'));
          if (!s("setRemoteDescription", r.type, i.signalingState) || i._isClosed) return Promise.reject(l("InvalidStateError", "Can not set remote " + r.type + " in state " + i.signalingState));
          var o = {};
          i.remoteStreams.forEach(function(e) {
              o[e.id] = e
          });
          var a = [],
              f = u.splitSections(r.sdp),
              p = f.shift(),
              v = u.matchPrefix(p, "a=ice-lite").length > 0,
              h = u.matchPrefix(p, "a=group:BUNDLE ").length > 0;
          i.usingBundle = h;
          var m = u.matchPrefix(p, "a=ice-options:")[0];
          return i.canTrickleIceCandidates = !!m && m.substr(14).split(" ").indexOf("trickle") >= 0, f.forEach(function(s, l) {
              var g = u.splitLines(s),
                  f = u.getKind(s),
                  m = u.isRejected(s) && 0 === u.matchPrefix(s, "a=bundle-only").length,
                  y = g[0].substr(2).split(" ")[2],
                  C = u.getDirection(s, p),
                  S = u.parseMsid(s),
                  _ = u.getMid(s) || u.generateIdentifier();
              if ("application" === f && "DTLS/SCTP" === y || m) return void(i.transceivers[l] = {
                  mid: _,
                  kind: f,
                  rejected: !0
              });
              !m && i.transceivers[l] && i.transceivers[l].rejected && (i.transceivers[l] = i._createTransceiver(f, !0));
              var E, L, M, b, R, T, k, I, P, w, O, A = u.parseRtpParameters(s);
              m || (w = u.getIceParameters(s, p), O = u.getDtlsParameters(s, p), O.role = "client"), k = u.parseRtpEncodingParameters(s);
              var D = u.parseRtcpParameters(s),
                  N = u.matchPrefix(s, "a=end-of-candidates", p).length > 0,
                  x = u.matchPrefix(s, "a=candidate:").map(function(e) {
                      return u.parseCandidate(e)
                  }).filter(function(e) {
                      return 1 === e.component
                  });
              if (("offer" === r.type || "answer" === r.type) && !m && h && l > 0 && i.transceivers[l] && (i._disposeIceAndDtlsTransports(l), i.transceivers[l].iceGatherer = i.transceivers[0].iceGatherer, i.transceivers[l].iceTransport = i.transceivers[0].iceTransport, i.transceivers[l].dtlsTransport = i.transceivers[0].dtlsTransport, i.transceivers[l].rtpSender && i.transceivers[l].rtpSender.setTransport(i.transceivers[0].dtlsTransport), i.transceivers[l].rtpReceiver && i.transceivers[l].rtpReceiver.setTransport(i.transceivers[0].dtlsTransport)), "offer" !== r.type || m) "answer" !== r.type || m || (E = i.transceivers[l], L = E.iceGatherer, M = E.iceTransport, b = E.dtlsTransport, R = E.rtpReceiver, T = E.sendEncodingParameters, I = E.localCapabilities, i.transceivers[l].recvEncodingParameters = k, i.transceivers[l].remoteCapabilities = A, i.transceivers[l].rtcpParameters = D, x.length && "new" === M.state && (!v && !N || h && 0 !== l ? x.forEach(function(e) {
                  c(E.iceTransport, e)
              }) : M.setRemoteCandidates(x)), h && 0 !== l || ("new" === M.state && M.start(L, w, "controlling"), "new" === b.state && b.start(O)), i._transceive(E, "sendrecv" === C || "recvonly" === C, "sendrecv" === C || "sendonly" === C), !R || "sendrecv" !== C && "sendonly" !== C ? delete E.rtpReceiver : (P = R.track, S ? (o[S.stream] || (o[S.stream] = new e.MediaStream), n(P, o[S.stream]), a.push([P, R, o[S.stream]])) : (o.default || (o.default = new e.MediaStream), n(P, o.default), a.push([P, R, o.default]))));
              else {
                  E = i.transceivers[l] || i._createTransceiver(f), E.mid = _, E.iceGatherer || (E.iceGatherer = i._createIceGatherer(l, h)), x.length && "new" === E.iceTransport.state && (!N || h && 0 !== l ? x.forEach(function(e) {
                      c(E.iceTransport, e)
                  }) : E.iceTransport.setRemoteCandidates(x)), I = e.RTCRtpReceiver.getCapabilities(f), t < 15019 && (I.codecs = I.codecs.filter(function(e) {
                      return "rtx" !== e.name
                  })), T = E.sendEncodingParameters || [{
                      ssrc: 1001 * (2 * l + 2)
                  }];
                  var j = !1;
                  if ("sendrecv" === C || "sendonly" === C) {
                      if (j = !E.rtpReceiver, R = E.rtpReceiver || new e.RTCRtpReceiver(E.dtlsTransport, f), j) {
                          var F;
                          P = R.track, S && "-" === S.stream || (S ? (o[S.stream] || (o[S.stream] = new e.MediaStream, Object.defineProperty(o[S.stream], "id", {
                              get: function() {
                                  return S.stream
                              }
                          })), Object.defineProperty(P, "id", {
                              get: function() {
                                  return S.track
                              }
                          }), F = o[S.stream]) : (o.default || (o.default = new e.MediaStream), F = o.default)), F && (n(P, F), E.associatedRemoteMediaStreams.push(F)), a.push([P, R, F])
                      }
                  } else E.rtpReceiver && E.rtpReceiver.track && (E.associatedRemoteMediaStreams.forEach(function(e) {
                      var t = e.getTracks().find(function(e) {
                          return e.id === E.rtpReceiver.track.id
                      });
                      t && d(t, e)
                  }), E.associatedRemoteMediaStreams = []);
                  E.localCapabilities = I, E.remoteCapabilities = A, E.rtpReceiver = R, E.rtcpParameters = D, E.sendEncodingParameters = T, E.recvEncodingParameters = k, i._transceive(i.transceivers[l], !1, j)
              }
          }), void 0 === i._dtlsRole && (i._dtlsRole = "offer" === r.type ? "active" : "passive"), i.remoteDescription = {
              type: r.type,
              sdp: r.sdp
          }, "offer" === r.type ? i._updateSignalingState("have-remote-offer") : i._updateSignalingState("stable"), Object.keys(o).forEach(function(t) {
              var n = o[t];
              if (n.getTracks().length) {
                  if (-1 === i.remoteStreams.indexOf(n)) {
                      i.remoteStreams.push(n);
                      var r = new Event("addstream");
                      r.stream = n, e.setTimeout(function() {
                          i._dispatchEvent("addstream", r)
                      })
                  }
                  a.forEach(function(e) {
                      var t = e[0],
                          r = e[1];
                      n.id === e[2].id && g(i, t, r, [n])
                  })
              }
          }), a.forEach(function(e) {
              e[2] || g(i, e[0], e[1], [])
          }), e.setTimeout(function() {
              i && i.transceivers && i.transceivers.forEach(function(e) {
                  e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
              })
          }, 4e3), Promise.resolve()
      }, f.prototype.close = function() {
          this.transceivers.forEach(function(e) {
              e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
          }), this._isClosed = !0, this._updateSignalingState("closed")
      }, f.prototype._updateSignalingState = function(e) {
          this.signalingState = e;
          var t = new Event("signalingstatechange");
          this._dispatchEvent("signalingstatechange", t)
      }, f.prototype._maybeFireNegotiationNeeded = function() {
          var t = this;
          "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(function() {
              if (t.needNegotiation) {
                  t.needNegotiation = !1;
                  var e = new Event("negotiationneeded");
                  t._dispatchEvent("negotiationneeded", e)
              }
          }, 0))
      }, f.prototype._updateIceConnectionState = function() {
          var e, t = {
              new: 0,
              closed: 0,
              checking: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
          };
          if (this.transceivers.forEach(function(e) {
                  t[e.iceTransport.state]++
              }), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
              this.iceConnectionState = e;
              var n = new Event("iceconnectionstatechange");
              this._dispatchEvent("iceconnectionstatechange", n)
          }
      }, f.prototype._updateConnectionState = function() {
          var e, t = {
              new: 0,
              closed: 0,
              connecting: 0,
              connected: 0,
              completed: 0,
              disconnected: 0,
              failed: 0
          };
          if (this.transceivers.forEach(function(e) {
                  t[e.iceTransport.state]++, t[e.dtlsTransport.state]++
              }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState) {
              this.connectionState = e;
              var n = new Event("connectionstatechange");
              this._dispatchEvent("connectionstatechange", n)
          }
      }, f.prototype.createOffer = function() {
          var n = this;
          if (n._isClosed) return Promise.reject(l("InvalidStateError", "Can not call createOffer after close"));
          var r = n.transceivers.filter(function(e) {
                  return "audio" === e.kind
              }).length,
              o = n.transceivers.filter(function(e) {
                  return "video" === e.kind
              }).length,
              a = arguments[0];
          if (a) {
              if (a.mandatory || a.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
              void 0 !== a.offerToReceiveAudio && (r = !0 === a.offerToReceiveAudio ? 1 : !1 === a.offerToReceiveAudio ? 0 : a.offerToReceiveAudio), void 0 !== a.offerToReceiveVideo && (o = !0 === a.offerToReceiveVideo ? 1 : !1 === a.offerToReceiveVideo ? 0 : a.offerToReceiveVideo)
          }
          for (n.transceivers.forEach(function(e) {
                  "audio" === e.kind ? --r < 0 && (e.wantReceive = !1) : "video" === e.kind && --o < 0 && (e.wantReceive = !1)
              }); r > 0 || o > 0;) r > 0 && (n._createTransceiver("audio"), r--), o > 0 && (n._createTransceiver("video"), o--);
          var s = u.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
          n.transceivers.forEach(function(r, i) {
              var o = r.track,
                  a = r.kind,
                  s = r.mid || u.generateIdentifier();
              r.mid = s, r.iceGatherer || (r.iceGatherer = n._createIceGatherer(i, n.usingBundle));
              var c = e.RTCRtpSender.getCapabilities(a);
              t < 15019 && (c.codecs = c.codecs.filter(function(e) {
                  return "rtx" !== e.name
              })), c.codecs.forEach(function(e) {
                  "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), r.remoteCapabilities && r.remoteCapabilities.codecs && r.remoteCapabilities.codecs.forEach(function(t) {
                      e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
                  })
              }), c.headerExtensions.forEach(function(e) {
                  (r.remoteCapabilities && r.remoteCapabilities.headerExtensions || []).forEach(function(t) {
                      e.uri === t.uri && (e.id = t.id)
                  })
              });
              var l = r.sendEncodingParameters || [{
                  ssrc: 1001 * (2 * i + 1)
              }];
              o && t >= 15019 && "video" === a && !l[0].rtx && (l[0].rtx = {
                  ssrc: l[0].ssrc + 1
              }), r.wantReceive && (r.rtpReceiver = new e.RTCRtpReceiver(r.dtlsTransport, a)), r.localCapabilities = c, r.sendEncodingParameters = l
          }), "max-compat" !== n._config.bundlePolicy && (s += "a=group:BUNDLE " + n.transceivers.map(function(e) {
              return e.mid
          }).join(" ") + "\r\n"), s += "a=ice-options:trickle\r\n", n.transceivers.forEach(function(e, t) {
              s += i(e, e.localCapabilities, "offer", e.stream, n._dtlsRole), s += "a=rtcp-rsize\r\n", !e.iceGatherer || "new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                  e.component = 1, s += "a=" + u.writeCandidate(e) + "\r\n"
              }), "completed" === e.iceGatherer.state && (s += "a=end-of-candidates\r\n"))
          });
          var c = new e.RTCSessionDescription({
              type: "offer",
              sdp: s
          });
          return Promise.resolve(c)
      }, f.prototype.createAnswer = function() {
          var n = this;
          if (n._isClosed) return Promise.reject(l("InvalidStateError", "Can not call createAnswer after close"));
          if ("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(l("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
          var r = u.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
          n.usingBundle && (r += "a=group:BUNDLE " + n.transceivers.map(function(e) {
              return e.mid
          }).join(" ") + "\r\n");
          var o = u.getMediaSections(n.remoteDescription.sdp).length;
          n.transceivers.forEach(function(e, s) {
              if (!(s + 1 > o)) {
                  if (e.rejected) return "application" === e.kind ? r += "m=application 0 DTLS/SCTP 5000\r\n" : "audio" === e.kind ? r += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (r += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void(r += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                  if (e.stream) {
                      var c;
                      "audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]), c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
                          ssrc: e.sendEncodingParameters[0].ssrc + 1
                      })
                  }
                  var l = a(e.localCapabilities, e.remoteCapabilities);
                  !l.codecs.filter(function(e) {
                      return "rtx" === e.name.toLowerCase()
                  }).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, r += i(e, l, "answer", e.stream, n._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (r += "a=rtcp-rsize\r\n")
              }
          });
          var s = new e.RTCSessionDescription({
              type: "answer",
              sdp: r
          });
          return Promise.resolve(s)
      }, f.prototype.addIceCandidate = function(e) {
          var t, n = this;
          return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(r, i) {
              if (!n.remoteDescription) return i(l("InvalidStateError", "Can not add ICE candidate without a remote description"));
              if (e && "" !== e.candidate) {
                  var o = e.sdpMLineIndex;
                  if (e.sdpMid)
                      for (var a = 0; a < n.transceivers.length; a++)
                          if (n.transceivers[a].mid === e.sdpMid) {
                              o = a;
                              break
                          } var s = n.transceivers[o];
                  if (!s) return i(l("OperationError", "Can not add ICE candidate"));
                  if (s.rejected) return r();
                  var d = Object.keys(e.candidate).length > 0 ? u.parseCandidate(e.candidate) : {};
                  if ("tcp" === d.protocol && (0 === d.port || 9 === d.port)) return r();
                  if (d.component && 1 !== d.component) return r();
                  if ((0 === o || o > 0 && s.iceTransport !== n.transceivers[0].iceTransport) && !c(s.iceTransport, d)) return i(l("OperationError", "Can not add ICE candidate"));
                  var g = e.candidate.trim();
                  0 === g.indexOf("a=") && (g = g.substr(2)), t = u.getMediaSections(n.remoteDescription.sdp), t[o] += "a=" + (d.type ? g : "end-of-candidates") + "\r\n", n.remoteDescription.sdp = u.getDescription(n.remoteDescription.sdp) + t.join("")
              } else
                  for (var f = 0; f < n.transceivers.length && (n.transceivers[f].rejected || (n.transceivers[f].iceTransport.addRemoteCandidate({}), t = u.getMediaSections(n.remoteDescription.sdp), t[f] += "a=end-of-candidates\r\n", n.remoteDescription.sdp = u.getDescription(n.remoteDescription.sdp) + t.join(""), !n.usingBundle)); f++);
              r()
          })
      }, f.prototype.getStats = function(t) {
          if (t && t instanceof e.MediaStreamTrack) {
              var n = null;
              if (this.transceivers.forEach(function(e) {
                      e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver)
                  }), !n) throw l("InvalidAccessError", "Invalid selector.");
              return n.getStats()
          }
          var r = [];
          return this.transceivers.forEach(function(e) {
              ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
                  e[t] && r.push(e[t].getStats())
              })
          }), Promise.all(r).then(function(e) {
              var t = new Map;
              return e.forEach(function(e) {
                  e.forEach(function(e) {
                      t.set(e.id, e)
                  })
              }), t
          })
      }, ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t) {
          var n = e[t];
          if (n && n.prototype && n.prototype.getStats) {
              var i = n.prototype.getStats;
              n.prototype.getStats = function() {
                  return i.apply(this).then(function(e) {
                      var t = new Map;
                      return Object.keys(e).forEach(function(n) {
                          e[n].type = r(e[n]), t.set(n, e[n])
                      }), t
                  })
              }
          }
      });
      var p = ["createOffer", "createAnswer"];
      return p.forEach(function(e) {
          var t = f.prototype[e];
          f.prototype[e] = function() {
              var e = arguments;
              return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
                  "function" == typeof e[0] && e[0].apply(null, [t])
              }, function(t) {
                  "function" == typeof e[1] && e[1].apply(null, [t])
              }) : t.apply(this, arguments)
          }
      }), p = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"], p.forEach(function(e) {
          var t = f.prototype[e];
          f.prototype[e] = function() {
              var e = arguments;
              return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
                  "function" == typeof e[1] && e[1].apply(null)
              }, function(t) {
                  "function" == typeof e[2] && e[2].apply(null, [t])
              }) : t.apply(this, arguments)
          }
      }), ["getStats"].forEach(function(e) {
          var t = f.prototype[e];
          f.prototype[e] = function() {
              var e = arguments;
              return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
                  "function" == typeof e[1] && e[1].apply(null)
              }) : t.apply(this, arguments)
          }
      }), f
  }
}, function(e, t, n) {
  "use strict";
  e.exports = function(e) {
      var t = e && e.navigator,
          n = function(e) {
              return {
                  name: {
                      PermissionDeniedError: "NotAllowedError"
                  } [e.name] || e.name,
                  message: e.message,
                  constraint: e.constraint,
                  toString: function() {
                      return this.name
                  }
              }
          },
          r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
      t.mediaDevices.getUserMedia = function(e) {
          return r(e).catch(function(e) {
              return Promise.reject(n(e))
          })
      }
  }
}, function(e, t, n) {
  "use strict";
  var r = n(9),
      i = {
          shimOnTrack: function(e) {
              "object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                  get: function() {
                      return this._ontrack
                  },
                  set: function(e) {
                      this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function(e) {
                          e.stream.getTracks().forEach(function(t) {
                              var n = new Event("track");
                              n.track = t, n.receiver = {
                                  track: t
                              }, n.transceiver = {
                                  receiver: n.receiver
                              }, n.streams = [e.stream], this.dispatchEvent(n)
                          }.bind(this))
                      }.bind(this))
                  }
              }), "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                  get: function() {
                      return {
                          receiver: this.receiver
                      }
                  }
              })
          },
          shimSourceObject: function(e) {
              "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                  get: function() {
                      return this.mozSrcObject
                  },
                  set: function(e) {
                      this.mozSrcObject = e
                  }
              }))
          },
          shimPeerConnection: function(e) {
              var t = r.detectBrowser(e);
              if ("object" == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                  e.RTCPeerConnection || (e.RTCPeerConnection = function(n, r) {
                      if (t.version < 38 && n && n.iceServers) {
                          for (var i = [], o = 0; o < n.iceServers.length; o++) {
                              var a = n.iceServers[o];
                              if (a.hasOwnProperty("urls"))
                                  for (var s = 0; s < a.urls.length; s++) {
                                      var c = {
                                          url: a.urls[s]
                                      };
                                      0 === a.urls[s].indexOf("turn") && (c.username = a.username, c.credential = a.credential), i.push(c)
                                  } else i.push(n.iceServers[o])
                          }
                          n.iceServers = i
                      }
                      return new e.mozRTCPeerConnection(n, r)
                  }, e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype, e.mozRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                      get: function() {
                          return e.mozRTCPeerConnection.generateCertificate
                      }
                  }), e.RTCSessionDescription = e.mozRTCSessionDescription, e.RTCIceCandidate = e.mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                      var n = e.RTCPeerConnection.prototype[t];
                      e.RTCPeerConnection.prototype[t] = function() {
                          return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
                      }
                  });
                  var n = e.RTCPeerConnection.prototype.addIceCandidate;
                  e.RTCPeerConnection.prototype.addIceCandidate = function() {
                      return arguments[0] ? n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                  };
                  var i = function(e) {
                          var t = new Map;
                          return Object.keys(e).forEach(function(n) {
                              t.set(n, e[n]), t[n] = e[n]
                          }), t
                      },
                      o = {
                          inboundrtp: "inbound-rtp",
                          outboundrtp: "outbound-rtp",
                          candidatepair: "candidate-pair",
                          localcandidate: "local-candidate",
                          remotecandidate: "remote-candidate"
                      },
                      a = e.RTCPeerConnection.prototype.getStats;
                  e.RTCPeerConnection.prototype.getStats = function(e, n, r) {
                      return a.apply(this, [e || null]).then(function(e) {
                          if (t.version < 48 && (e = i(e)), t.version < 53 && !n) try {
                              e.forEach(function(e) {
                                  e.type = o[e.type] || e.type
                              })
                          } catch (t) {
                              if ("TypeError" !== t.name) throw t;
                              e.forEach(function(t, n) {
                                  e.set(n, Object.assign({}, t, {
                                      type: o[t.type] || t.type
                                  }))
                              })
                          }
                          return e
                      }).then(n, r)
                  }
              }
          },
          shimRemoveStream: function(e) {
              "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                  var t = this;
                  r.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(n) {
                      n.track && -1 !== e.getTracks().indexOf(n.track) && t.removeTrack(n)
                  })
              })
          }
      };
  e.exports = {
      shimOnTrack: i.shimOnTrack,
      shimSourceObject: i.shimSourceObject,
      shimPeerConnection: i.shimPeerConnection,
      shimRemoveStream: i.shimRemoveStream,
      shimGetUserMedia: n(75)
  }
}, function(e, t, n) {
  "use strict";
  var r = n(9),
      i = r.log;
  e.exports = function(e) {
      var t = r.detectBrowser(e),
          n = e && e.navigator,
          o = e && e.MediaStreamTrack,
          a = function(e) {
              return {
                  name: {
                      InternalError: "NotReadableError",
                      NotSupportedError: "TypeError",
                      PermissionDeniedError: "NotAllowedError",
                      SecurityError: "NotAllowedError"
                  } [e.name] || e.name,
                  message: {
                      "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
                  } [e.message] || e.message,
                  constraint: e.constraint,
                  toString: function() {
                      return this.name + (this.message && ": ") + this.message
                  }
              }
          },
          s = function(e, r, o) {
              var s = function(e) {
                  if ("object" != typeof e || e.require) return e;
                  var t = [];
                  return Object.keys(e).forEach(function(n) {
                      if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                          var r = e[n] = "object" == typeof e[n] ? e[n] : {
                              ideal: e[n]
                          };
                          if (void 0 === r.min && void 0 === r.max && void 0 === r.exact || t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
                              e.advanced = e.advanced || [];
                              var i = {};
                              "number" == typeof r.ideal ? i[n] = {
                                  min: r.ideal,
                                  max: r.ideal
                              } : i[n] = r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
                          }
                      }
                  }), t.length && (e.require = t), e
              };
              return e = JSON.parse(JSON.stringify(e)), t.version < 38 && (i("spec: " + JSON.stringify(e)), e.audio && (e.audio = s(e.audio)), e.video && (e.video = s(e.video)), i("ff37: " + JSON.stringify(e))), n.mozGetUserMedia(e, r, function(e) {
                  o(a(e))
              })
          },
          c = function(e) {
              return new Promise(function(t, n) {
                  s(e, t, n)
              })
          };
      if (n.mediaDevices || (n.mediaDevices = {
              getUserMedia: c,
              addEventListener: function() {},
              removeEventListener: function() {}
          }), n.mediaDevices.enumerateDevices = n.mediaDevices.enumerateDevices || function() {
              return new Promise(function(e) {
                  e([{
                      kind: "audioinput",
                      deviceId: "default",
                      label: "",
                      groupId: ""
                  }, {
                      kind: "videoinput",
                      deviceId: "default",
                      label: "",
                      groupId: ""
                  }])
              })
          }, t.version < 41) {
          var l = n.mediaDevices.enumerateDevices.bind(n.mediaDevices);
          n.mediaDevices.enumerateDevices = function() {
              return l().then(void 0, function(e) {
                  if ("NotFoundError" === e.name) return [];
                  throw e
              })
          }
      }
      if (t.version < 49) {
          var u = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
          n.mediaDevices.getUserMedia = function(e) {
              return u(e).then(function(t) {
                  if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                      e.stop()
                  }), new DOMException("The object can not be found here.", "NotFoundError");
                  return t
              }, function(e) {
                  return Promise.reject(a(e))
              })
          }
      }
      if (!(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
          var d = function(e, t, n) {
                  t in e && !(n in e) && (e[n] = e[t], delete e[t])
              },
              g = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
          if (n.mediaDevices.getUserMedia = function(e) {
                  return "object" == typeof e && "object" == typeof e.audio && (e = JSON.parse(JSON.stringify(e)), d(e.audio, "autoGainControl", "mozAutoGainControl"), d(e.audio, "noiseSuppression", "mozNoiseSuppression")), g(e)
              }, o && o.prototype.getSettings) {
              var f = o.prototype.getSettings;
              o.prototype.getSettings = function() {
                  var e = f.apply(this, arguments);
                  return d(e, "mozAutoGainControl", "autoGainControl"), d(e, "mozNoiseSuppression", "noiseSuppression"), e
              }
          }
          if (o && o.prototype.applyConstraints) {
              var p = o.prototype.applyConstraints;
              o.prototype.applyConstraints = function(e) {
                  return "audio" === this.kind && "object" == typeof e && (e = JSON.parse(JSON.stringify(e)), d(e, "autoGainControl", "mozAutoGainControl"), d(e, "noiseSuppression", "mozNoiseSuppression")), p.apply(this, [e])
              }
          }
      }
      n.getUserMedia = function(e, i, o) {
          if (t.version < 44) return s(e, i, o);
          r.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(i, o)
      }
  }
}, function(e, t, n) {
  "use strict";
  var r = n(9),
      i = {
          shimLocalStreamsAPI: function(e) {
              if ("object" == typeof e && e.RTCPeerConnection) {
                  if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                          return this._localStreams || (this._localStreams = []), this._localStreams
                      }), "getStreamById" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getStreamById = function(e) {
                          var t = null;
                          return this._localStreams && this._localStreams.forEach(function(n) {
                              n.id === e && (t = n)
                          }), this._remoteStreams && this._remoteStreams.forEach(function(n) {
                              n.id === e && (t = n)
                          }), t
                      }), !("addStream" in e.RTCPeerConnection.prototype)) {
                      var t = e.RTCPeerConnection.prototype.addTrack;
                      e.RTCPeerConnection.prototype.addStream = function(e) {
                          this._localStreams || (this._localStreams = []), -1 === this._localStreams.indexOf(e) && this._localStreams.push(e);
                          var n = this;
                          e.getTracks().forEach(function(r) {
                              t.call(n, r, e)
                          })
                      }, e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                          n && (this._localStreams ? -1 === this._localStreams.indexOf(n) && this._localStreams.push(n) : this._localStreams = [n]), t.call(this, e, n)
                      }
                  }
                  "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                      this._localStreams || (this._localStreams = []);
                      var t = this._localStreams.indexOf(e);
                      if (-1 !== t) {
                          this._localStreams.splice(t, 1);
                          var n = this,
                              r = e.getTracks();
                          this.getSenders().forEach(function(e) {
                              -1 !== r.indexOf(e.track) && n.removeTrack(e)
                          })
                      }
                  })
              }
          },
          shimRemoteStreamsAPI: function(e) {
              "object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                  return this._remoteStreams ? this._remoteStreams : []
              }), "onaddstream" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                  get: function() {
                      return this._onaddstream
                  },
                  set: function(e) {
                      this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = function(e) {
                          var t = e.streams[0];
                          if (this._remoteStreams || (this._remoteStreams = []), !(this._remoteStreams.indexOf(t) >= 0)) {
                              this._remoteStreams.push(t);
                              var n = new Event("addstream");
                              n.stream = e.streams[0], this.dispatchEvent(n)
                          }
                      }.bind(this))
                  }
              }))
          },
          shimCallbacksAPI: function(e) {
              if ("object" == typeof e && e.RTCPeerConnection) {
                  var t = e.RTCPeerConnection.prototype,
                      n = t.createOffer,
                      r = t.createAnswer,
                      i = t.setLocalDescription,
                      o = t.setRemoteDescription,
                      a = t.addIceCandidate;
                  t.createOffer = function(e, t) {
                      var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                          i = n.apply(this, [r]);
                      return t ? (i.then(e, t), Promise.resolve()) : i
                  }, t.createAnswer = function(e, t) {
                      var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                          i = r.apply(this, [n]);
                      return t ? (i.then(e, t), Promise.resolve()) : i
                  };
                  var s = function(e, t, n) {
                      var r = i.apply(this, [e]);
                      return n ? (r.then(t, n), Promise.resolve()) : r
                  };
                  t.setLocalDescription = s, s = function(e, t, n) {
                      var r = o.apply(this, [e]);
                      return n ? (r.then(t, n), Promise.resolve()) : r
                  }, t.setRemoteDescription = s, s = function(e, t, n) {
                      var r = a.apply(this, [e]);
                      return n ? (r.then(t, n), Promise.resolve()) : r
                  }, t.addIceCandidate = s
              }
          },
          shimGetUserMedia: function(e) {
              var t = e && e.navigator;
              t.getUserMedia || (t.webkitGetUserMedia ? t.getUserMedia = t.webkitGetUserMedia.bind(t) : t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, n, r) {
                  t.mediaDevices.getUserMedia(e).then(n, r)
              }.bind(t)))
          },
          shimRTCIceServerUrls: function(e) {
              var t = e.RTCPeerConnection;
              e.RTCPeerConnection = function(e, n) {
                  if (e && e.iceServers) {
                      for (var i = [], o = 0; o < e.iceServers.length; o++) {
                          var a = e.iceServers[o];
                          !a.hasOwnProperty("urls") && a.hasOwnProperty("url") ? (r.deprecated("RTCIceServer.url", "RTCIceServer.urls"), a = JSON.parse(JSON.stringify(a)), a.urls = a.url, delete a.url, i.push(a)) : i.push(e.iceServers[o])
                      }
                      e.iceServers = i
                  }
                  return new t(e, n)
              }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                  get: function() {
                      return t.generateCertificate
                  }
              })
          },
          shimTrackEventTransceiver: function(e) {
              "object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                  get: function() {
                      return {
                          receiver: this.receiver
                      }
                  }
              })
          },
          shimCreateOfferLegacy: function(e) {
              var t = e.RTCPeerConnection.prototype.createOffer;
              e.RTCPeerConnection.prototype.createOffer = function(e) {
                  var n = this;
                  if (e) {
                      var r = n.getTransceivers().find(function(e) {
                          return e.sender.track && "audio" === e.sender.track.kind
                      });
                      !1 === e.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection("sendonly") : "recvonly" === r.direction && r.setDirection("inactive") : !0 !== e.offerToReceiveAudio || r || n.addTransceiver("audio");
                      var i = n.getTransceivers().find(function(e) {
                          return e.sender.track && "video" === e.sender.track.kind
                      });
                      !1 === e.offerToReceiveVideo && i ? "sendrecv" === i.direction ? i.setDirection("sendonly") : "recvonly" === i.direction && i.setDirection("inactive") : !0 !== e.offerToReceiveVideo || i || n.addTransceiver("video")
                  }
                  return t.apply(n, arguments)
              }
          }
      };
  e.exports = {
      shimCallbacksAPI: i.shimCallbacksAPI,
      shimLocalStreamsAPI: i.shimLocalStreamsAPI,
      shimRemoteStreamsAPI: i.shimRemoteStreamsAPI,
      shimGetUserMedia: i.shimGetUserMedia,
      shimRTCIceServerUrls: i.shimRTCIceServerUrls,
      shimTrackEventTransceiver: i.shimTrackEventTransceiver,
      shimCreateOfferLegacy: i.shimCreateOfferLegacy
  }
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
      if (e.RTCPeerConnection) {
          var r = e.RTCPeerConnection.prototype,
              i = r.addEventListener;
          r.addEventListener = function(e, r) {
              if (e !== t) return i.apply(this, arguments);
              var o = function(e) {
                  r(n(e))
              };
              return this._eventMap = this._eventMap || {}, this._eventMap[r] = o, i.apply(this, [e, o])
          };
          var o = r.removeEventListener;
          r.removeEventListener = function(e, n) {
              if (e !== t || !this._eventMap || !this._eventMap[n]) return o.apply(this, arguments);
              var r = this._eventMap[n];
              return delete this._eventMap[n], o.apply(this, [e, r])
          }, Object.defineProperty(r, "on" + t, {
              get: function() {
                  return this["_on" + t]
              },
              set: function(e) {
                  this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e)
              }
          })
      }
  }
  var i = n(43),
      o = n(9);
  e.exports = {
      shimRTCIceCandidate: function(e) {
          if (!(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
              var t = e.RTCIceCandidate;
              e.RTCIceCandidate = function(e) {
                  "object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && (e = JSON.parse(JSON.stringify(e)), e.candidate = e.candidate.substr(2));
                  var n = new t(e),
                      r = i.parseCandidate(e.candidate),
                      o = Object.assign(n, r);
                  return o.toJSON = function() {
                      return {
                          candidate: o.candidate,
                          sdpMid: o.sdpMid,
                          sdpMLineIndex: o.sdpMLineIndex,
                          usernameFragment: o.usernameFragment
                      }
                  }, o
              }, r(e, "icecandidate", function(t) {
                  return t.candidate && Object.defineProperty(t, "candidate", {
                      value: new e.RTCIceCandidate(t.candidate),
                      writable: "false"
                  }), t
              })
          }
      },
      shimCreateObjectURL: function(e) {
          var t = e && e.URL;
          if ("object" == typeof e && e.HTMLMediaElement && "srcObject" in e.HTMLMediaElement.prototype && t.createObjectURL && t.revokeObjectURL) {
              var n = t.createObjectURL.bind(t),
                  r = t.revokeObjectURL.bind(t),
                  i = new Map,
                  a = 0;
              t.createObjectURL = function(e) {
                  if ("getTracks" in e) {
                      var t = "polyblob:" + ++a;
                      return i.set(t, e), o.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"), t
                  }
                  return n(e)
              }, t.revokeObjectURL = function(e) {
                  r(e), i.delete(e)
              };
              var s = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src");
              Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
                  get: function() {
                      return s.get.apply(this)
                  },
                  set: function(e) {
                      return this.srcObject = i.get(e) || null, s.set.apply(this, [e])
                  }
              });
              var c = e.HTMLMediaElement.prototype.setAttribute;
              e.HTMLMediaElement.prototype.setAttribute = function() {
                  return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = i.get(arguments[1]) || null), c.apply(this, arguments)
              }
          }
      }
  }
}]);