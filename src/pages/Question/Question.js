var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Question = (function (_super) {
    __extends(Question, _super);
    function Question() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Question.prototype.OnEnter = function () {
        var el = $('<div></div>').load("./src/pages/Question", function () {
            $("#root").append(el);
            Main.moveRight();
            Question.addQuestaoAlternativa("pergunta 1?", 3, ['nenene', 'nanana', 'ninini', 'nonono'], 0);
            Question.mostraAlternativas(0);
            Question.addQuestaoAlternativa("pergunta 2?", 2, ['aaa', 'bbb', 'ccc', 'ddd'], 1);
        });
        Question.corretas = 0;
    };
    Question.prototype.OnExit = function () {
    };
    Question.addQuestaoAlternativa = function (enunciado, dificuldade, alternativas, certa) {
        var pergunta = new Alternativa(enunciado, dificuldade, alternativas, certa);
        Main.partida.addUltimaQuestoesAlternativa(pergunta);
        console.log("Adicionado questao de alternativa.");
    };
    Question.mostraAlternativas = function (numQuestao) {
        var questaoAtual = Main.partida.getQuestoesAlternativa()[numQuestao];
        $("#enunciado").html(questaoAtual.getEnunciado());
        console.log("Adicionado enunciado - " + questaoAtual.getEnunciado() + " - no HTML");
        for (var i = 0; i < (questaoAtual.getAlternativas()).length; i++) {
            $("#alternativas").append("<li> <a onClick=\"Question.validarResposta(" + numQuestao + ", " + i + ")\"><span class=\"alternativa\">$a" + i + " </span>" + questaoAtual.getAlternativas()[i] + "</a> </li>");
            console.log("Adicionado alternativa " + i + " no HTML");
        }
    };
    Question.proxima = function (antiga) {
        $("#resposta").animate({ "margin-top": "50vh" }, "fast");
        if (Question.corretas < 2) {
            $("#alternativas").html("");
            Question.mostraAlternativas(antiga + 1);
        }
        else {
            $('#win').get(0).play();
            Main.LoadPage("Level");
        }
    };
    Question.validarResposta = function (questao, resposta) {
        if ($("#resposta").css("margin-top") != "0px") {
            if (resposta == Main.partida.getQuestoesAlternativa()[questao].getCorreta()) {
                $("#respostaErrada").hide();
                $("#mensagem").html("Você <b>acertou</b>, parabéns!");
                $('#correct').get(0).play();
                Question.corretas++;
            }
            else {
                $("#respostaErrada").show();
                $("#mensagem").html("A alternativa correta era <b>$a0</b>");
                $('#incorrect').get(0).play();
            }
            $("#resposta").animate({ "margin-top": "0vh" }, "fast");
        }
    };
    return Question;
}(Tela));
