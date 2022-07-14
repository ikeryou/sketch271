
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item:Array<{el:HTMLElement, list:Array<string>, fix:string}> = [];
  private _fixText:Array<string> = [
    'これはズームすることで、だんだんとテキストを読むことができるWebサイトです。',
    '今までなんとなく避けてきたんですが、健康のために糖質ゼロのビールを飲むようになりました。',
    '普通のビールと比べると、正直ちょっと味が薄く物足りない感じがするんですが、',
    '最初の一缶目は普通の、糖質ゼロじゃないビールを飲んで舌をバカにしてから、',
    '糖質ゼロのビールを飲むとたいして味の違いがわからなくなってビール美味いってなる、',
    'ライフハックを、先日発見しました。'
  ];

  constructor(opt:any) {
    super(opt)

    let innerTxt = '';
    this._fixText.forEach((val) => {
      let arr = Array.from(val);
      for(let i = 0; i < arr.length; i++) {
        innerTxt += '<span>' + arr[i] + '</span>';
      }
      innerTxt += '<br><br>';
    });

    (document.querySelector('.l-text > .inner') as HTMLElement).innerHTML = innerTxt;

    document.querySelectorAll('.l-text span').forEach((val) => {
      this._item.push({
        el:val as HTMLElement,
        fix:val.innerHTML,
        list:this._getList()
      });
    })
  }


  private _getList(): Array<string> {
    const arr:Array<string> = [];
    for(let i = 0; i < 20; i++) {
      arr.push(Util.instance.randomArr(['■', '□', '◯', '●', '▲', '▽']))
    }
    return arr;
  }


  protected _update(): void {
    super._update();

    const zoomer = document.body.clientWidth / window.innerWidth;
    Param.instance.zoom = zoomer;

    const rate = Util.instance.map(zoomer, 0, 1, 1, 3);

    const len = this._item.length;
    this._item.forEach((val,i) => {
      const isFix = (1 / len) * i < rate;
      if(isFix) {
        val.el.innerHTML = val.fix;
      } else {
        const key = 0;
        const t = val.list[key];
        val.el.innerHTML = t;
      }
    })
  }
}