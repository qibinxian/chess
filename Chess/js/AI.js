var AI=AI||{};AI.init=function(e){var t=this.historyBill||Chess.gambit;if(t.length){for(var r=e.length,a=[],h=0;h<t.length;h++)t[h].slice(0,r)==e&&a.push(t[h]);if(a.length){var s=Math.floor(Math.random()*a.length);return this.historyBill=a,a[s].slice(r,r+4).split("")}this.historyBill=[]}var n=(new Date).getTime();this.treeDepth=play.depth,this.number=0;var l=this.getAlphaBeta(-99999,99999,this.treeDepth,play.map.arr2Clone(),play.my);if(l&&-8888!=l.value||(this.treeDepth=2,l=this.getAlphaBeta(-99999,99999,this.treeDepth,play.map.arr2Clone(),play.my)),l&&-8888!=l.value){var i=Chess.mans[l.key],u=(new Date).getTime();return console.log("AI搜索结果：\n最佳着法"+Chess.createMove(play.map.arr2Clone(),i.CheckerX,i.CheckerY,l.x,l.y)+"\n搜索深度："+this.treeDepth+"\n搜索分支："+this.number+"\n最佳着法评估："+l.value+"\n搜索用时："+(u-n)+"毫秒"),[i.CheckerX,i.CheckerY,l.x,l.y]}return!1},AI.getMapAllMan=function(e,t){for(var r=[],a=0;a<e.length;a++)for(var h=0;h<e[a].length;h++){var s=e[a][h];s&&Chess.mans[s].args.my==t&&(Chess.mans[s].CheckerX=h,Chess.mans[s].CheckerY=a,r.push(Chess.mans[s]))}return r},AI.getMoves=function(e,t){for(var r=this.getMapAllMan(e,t),a=[],h=play.isFoul,s=0,n=r.length;s<n;s++)for(var l=r[s],i=l.CheckerX,u=l.CheckerY,v=Chess.bylaw[l.args.bl](i,u,e,t),C=0,o=v.length;C<o;C++){var g=v[C][0],p=v[C][1];h[0]==i&&h[1]==u&&h[2]==g&&h[3]==p||a.push([i,u,g,p,l.key])}return a},AI.getAlphaBeta=function(e,t,r,a,h){if(0==r)return{value:AI.evaluate(a,h)};for(var s=this.getMoves(a,h),n=null,l=0,i=s.length;l<i;l++){var u=s[l],v=u[4],C=u[0],o=u[1],g=u[2],p=u[3],m=a[p][g]||"";if(a[p][g]=v,delete a[o][C],Chess.mans[v].CheckerX=g,Chess.mans[v].CheckerY=p,"j0"==m||"J0"==m)return Chess.mans[v].CheckerX=C,Chess.mans[v].CheckerY=o,a[o][C]=v,delete a[p][g],m&&(a[p][g]=m),{key:v,x:g,y:p,value:8888};var y=-AI.getAlphaBeta(-t,-e,r-1,a,-h).value;if(Chess.mans[v].CheckerX=C,Chess.mans[v].CheckerY=o,a[o][C]=v,delete a[p][g],m&&(a[p][g]=m),y>=t)return{key:v,x:g,y:p,value:t};y>e&&(e=y,this.treeDepth==r&&(n={key:v,x:g,y:p,value:e}))}return this.treeDepth==r?n||!1:{key:v,x:g,y:p,value:e}},AI.evaluate=function(e,t){for(var r=0,a=0;a<e.length;a++)for(var h=0;h<e[a].length;h++){var s=e[a][h];s&&(r+=Chess.mans[s].args.value[a][h]*Chess.mans[s].args.my)}return this.number++,r*t};