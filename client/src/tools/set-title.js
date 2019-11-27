function setTitle(titleString, isRandomEmoji) {
    let title = `Xiaoxi's Home`;

    if (titleString) {
        title = `${title} - ${titleString}`;
    }

    if (isRandomEmoji) {
        const randomEmojiArray = [
            '⊂(˃̶͈̀ε ˂̶͈́ ⊂ )))Σ≡=─',
            '( ⸝⸝⸝°_°⸝⸝⸝ )',
            'ฅʕ•̫͡•ʔฅ',
            '(ง •̀_•́)ง',
            'Zzz...(¦3ꇤ[▓▓]',
            '୧(˶‾᷄ ⁻̫ ‾᷅˵)୨',
            'ᕕ( ᐛ )ᕗ',
            'ᶘ ᵒᴥᵒᶅ',
            '┌|°з°|┘└|°ε°|┐┌|°э°|┘',
            'ヽ(‘ ∇‘ )ノ',
            '₍˄·͈༝·͈˄₎ฅ˒˒',
        ];
        const pickOne = Math.floor(Math.random() * randomEmojiArray.length );
        title = `${title} ${randomEmojiArray[pickOne]}`;
    }

    document.title = title;
}

export {setTitle};