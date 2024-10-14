(() => {
    "use strict";
    const t = function(t) {
            return "string" != typeof t || "" === t ? (console.error("The namespace must be a non-empty string."), !1) : !!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(t) || (console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes."), !1)
        },
        n = function(t) {
            return "string" != typeof t || "" === t ? (console.error("The hook name must be a non-empty string."), !1) : /^__/.test(t) ? (console.error("The hook name cannot begin with `__`."), !1) : !!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(t) || (console.error("The hook name can only contain numbers, letters, dashes, periods and underscores."), !1)
        },
        e = function(e, o) {
            return function(r, i, s) {
                let c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10;
                const l = e[o];
                if (!n(r)) return;
                if (!t(i)) return;
                if ("function" != typeof s) return void console.error("The hook callback must be a function.");
                if ("number" != typeof c) return void console.error("If specified, the hook priority must be a number.");
                const a = {
                    callback: s,
                    priority: c,
                    namespace: i
                };
                if (l[r]) {
                    const t = l[r].handlers;
                    let n;
                    for (n = t.length; n > 0 && !(c >= t[n - 1].priority); n--);
                    n === t.length ? t[n] = a : t.splice(n, 0, a), l.__current.forEach((t => {
                        t.name === r && t.currentIndex >= n && t.currentIndex++
                    }))
                } else l[r] = {
                    handlers: [a],
                    runs: 0
                };
                "hookAdded" !== r && e.doAction("hookAdded", r, i, s, c)
            }
        },
        o = function(e, o) {
            let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return function(i, s) {
                const c = e[o];
                if (!n(i)) return;
                if (!r && !t(s)) return;
                if (!c[i]) return 0;
                let l = 0;
                if (r) l = c[i].handlers.length, c[i] = {
                    runs: c[i].runs,
                    handlers: []
                };
                else {
                    const t = c[i].handlers;
                    for (let n = t.length - 1; n >= 0; n--) t[n].namespace === s && (t.splice(n, 1), l++, c.__current.forEach((t => {
                        t.name === i && t.currentIndex >= n && t.currentIndex--
                    })))
                }
                return "hookRemoved" !== i && e.doAction("hookRemoved", i, s), l
            }
        },
        r = function(t, n) {
            return function(e, o) {
                const r = t[n];
                return void 0 !== o ? e in r && r[e].handlers.some((t => t.namespace === o)) : e in r
            }
        },
        i = function(t, n) {
            let e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return function(o) {
                const r = t[n];
                r[o] || (r[o] = {
                    handlers: [],
                    runs: 0
                }), r[o].runs++;
                const i = r[o].handlers;
                for (var s = arguments.length, c = new Array(s > 1 ? s - 1 : 0), l = 1; l < s; l++) c[l - 1] = arguments[l];
                if (!i || !i.length) return e ? c[0] : void 0;
                const a = {
                    name: o,
                    currentIndex: 0
                };
                for (r.__current.push(a); a.currentIndex < i.length;) {
                    const t = i[a.currentIndex].callback.apply(null, c);
                    e && (c[0] = t), a.currentIndex++
                }
                return r.__current.pop(), e ? c[0] : void 0
            }
        },
        s = function(t, n) {
            return function() {
                var e, o;
                const r = t[n];
                return null !== (e = null === (o = r.__current[r.__current.length - 1]) || void 0 === o ? void 0 : o.name) && void 0 !== e ? e : null
            }
        },
        c = function(t, n) {
            return function(e) {
                const o = t[n];
                return void 0 === e ? void 0 !== o.__current[0] : !!o.__current[0] && e === o.__current[0].name
            }
        },
        l = function(t, e) {
            return function(o) {
                const r = t[e];
                if (n(o)) return r[o] && r[o].runs ? r[o].runs : 0
            }
        };
    class a {
        constructor() {
            this.actions = Object.create(null), this.actions.__current = [], this.filters = Object.create(null), this.filters.__current = [], this.addAction = e(this, "actions"), this.addFilter = e(this, "filters"), this.removeAction = o(this, "actions"), this.removeFilter = o(this, "filters"), this.hasAction = r(this, "actions"), this.hasFilter = r(this, "filters"), this.removeAllActions = o(this, "actions", !0), this.removeAllFilters = o(this, "filters", !0), this.doAction = i(this, "actions"), this.applyFilters = i(this, "filters", !0), this.currentAction = s(this, "actions"), this.currentFilter = s(this, "filters"), this.doingAction = c(this, "actions"), this.doingFilter = c(this, "filters"), this.didAction = l(this, "actions"), this.didFilter = l(this, "filters")
        }
    }
    const u = function() {
            return new a
        },
        h = u(),
        {
            addAction: d,
            addFilter: f,
            removeAction: m,
            removeFilter: k,
            hasAction: v,
            hasFilter: p,
            removeAllActions: b,
            removeAllFilters: y,
            doAction: g,
            applyFilters: A,
            currentAction: _,
            currentFilter: F,
            doingAction: B,
            doingFilter: w,
            didAction: I,
            didFilter: N,
            actions: j,
            filters: x
        } = h;

    function S(t) {
        return S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, S(t)
    }

    function T(t, n) {
        for (var e = 0; e < n.length; e++) {
            var o = n[e];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, C(o.key), o)
        }
    }

    function P(t, n, e) {
        return (n = C(n)) in t ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[n] = e, t
    }

    function C(t) {
        var n = function(t, n) {
            if ("object" !== S(t) || null === t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var o = e.call(t, "string");
                if ("object" !== S(o)) return o;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(t)
        }(t);
        return "symbol" === S(n) ? n : String(n)
    }
    var O = function() {
        function t(n) {
            ! function(t, n) {
                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
            }(this, t), P(this, "hooks", void 0), P(this, "globalNamespace", "jet-plugins"), P(this, "blocksNamespace", "frontend.element-ready"), P(this, "blocksConditions", {}), this.hooks = n || u()
        }
        var n, e;
        return n = t, (e = [{
            key: "hookNameFromBlock",
            value: function(t) {
                var n = this.getBlockName(t);
                return n ? "".concat(this.globalNamespace, ".").concat(this.blocksNamespace, ".").concat(n) : ""
            }
        }, {
            key: "getBlockName",
            value: function(t) {
                var n;
                return "string" == typeof t ? t.replace("/", ".") : this.getBlockName((null == t || null === (n = t.dataset) || void 0 === n ? void 0 : n.isBlock) || "")
            }
        }, {
            key: "init",
            value: function(t, n) {
                var e = this;
                if (n && n.length && this.bulkBlocksInit(n), (t = t || jQuery("body")) && t.length) {
                    var o = t.find('[data-is-block*="/"]');
                    o && o.length && o.each((function(t, n) {
                        e.initBlock(n)
                    }))
                }
            }
        }, {
            key: "isBlockRequiresInit",
            value: function(t) {
                var n = void 0 === t.dataset.jetInited,
                    e = this.getBlockName(t);
                return n && this.blocksConditions[e] && (n = this.blocksConditions[e](t)), n
            }
        }, {
            key: "initBlock",
            value: function(t, n) {
                n = n || !1;
                var e = this.hookNameFromBlock(t);
                if (e && this.hasHandlers(e)) {
                    var o = n;
                    o || (o = this.isBlockRequiresInit(t)), o && (this.hooks.doAction(e, jQuery(t)), t.dataset.jetInited = !0)
                }
            }
        }, {
            key: "hasHandlers",
            value: function(t) {
                return !!this.hooks.actions[t] && !(!this.hooks.actions[t].handlers || !this.hooks.actions[t].handlers.length)
            }
        }, {
            key: "registerBlockHandlers",
            value: function(t) {
                var n = this.getBlockName(t.block);
                this.hooks.addAction(this.hookNameFromBlock(n), "".concat(this.globalNamespace, "/").concat(t.block), t.callback), t.condition && "function" == typeof t.condition && (this.blocksConditions[n] = t.condition)
            }
        }, {
            key: "bulkBlocksInit",
            value: function(t) {
                for (var n = 0; n < t.length; n++) this.registerBlockHandlers(t[n])
            }
        }]) && T(n.prototype, e), Object.defineProperty(n, "prototype", {
            writable: !1
        }), t
    }();
    window.JetPlugins = window.JetPlugins || new O
})();