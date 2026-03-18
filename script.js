document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');

    // 合い言葉
    const REQUIRED_PW = '北の国から';

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // フォームのデフォルト送信を防ぐ

        const userPw = passwordInput.value.trim();

        if (userPw === REQUIRED_PW) {
            // ログイン成功
            loginError.style.display = 'none';
            
            // 画面の切り替え
            loginScreen.classList.remove('active');
            loginScreen.classList.add('hidden');
            
            // 少し遅らせてメインコンテンツをフェードイン
            setTimeout(() => {
                // DOMからログイン画面を完全に消す（オプション）
                loginScreen.style.display = 'none';
                
                mainContent.classList.remove('hidden');
                mainContent.classList.add('active');
                
                // スクロール位置を一番上にする
                window.scrollTo(0, 0);
                
                // bodyのスクロールロックを解除
                document.body.classList.remove('login-active');

                // テキストの1文字ずつ表示アニメーション
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle && !heroTitle.classList.contains('animated')) {
                    const textContent = heroTitle.innerHTML;
                    // 一度全て取得して、<br>タグとそうでないテキストに分ける
                    // <br>はそのまま、文字は<span>にラップして遅延を付与
                    const segments = textContent.split(/(<br\s*\/?>)/i);
                    let charCount = 0;
                    let htmlString = '';
                    
                    segments.forEach(segment => {
                        if (/<br\s*\/?>/i.test(segment)) {
                            htmlString += segment;
                        } else {
                            const chars = Array.from(segment); // サロゲートペア対応
                            chars.forEach(char => {
                                // 空白や改行をスキップ
                                if (char.trim() === '') {
                                    htmlString += char;
                                } else {
                                    htmlString += `<span class="char-reveal" style="animation-delay: ${0.8 + (charCount * 0.15)}s">${char}</span>`;
                                    charCount++;
                                }
                            });
                        }
                    });
                    
                    heroTitle.innerHTML = htmlString;
                    heroTitle.classList.add('animated');
                }
            }, 800); // CSSのtransition(0.8s)と合わせる

        } else {
            // ログイン失敗
            loginError.style.display = 'block';
            
            // 入力欄を少し揺らすアニメーション（オプションの実装）
            loginForm.animate([
                { transform: 'translateX(0px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0px)' }
            ], {
                duration: 400,
                iterations: 1
            });
        }
    });
});
