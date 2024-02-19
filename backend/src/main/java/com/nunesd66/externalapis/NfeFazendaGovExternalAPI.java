package com.nunesd66.externalapis;

import com.nunesd66.entity.HistoricoAutorizador;
import com.nunesd66.entity.Autorizador;
import com.nunesd66.enumeration.ColorStatusEnum;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.nunesd66.constants.NfeFazendaGovConstants.TBODY;
import static com.nunesd66.constants.NfeFazendaGovConstants.URL;
import static com.nunesd66.enumeration.ColorStatusEnum.fromImgAttrStatus;

public class NfeFazendaGovExternalAPI {

    static List<HistoricoAutorizador> historicoList;

    public static List<HistoricoAutorizador> consumer() throws IOException {
        historicoList = new ArrayList<>();

        Document doc = Jsoup.connect(URL).get();
        Elements tbody = doc.select(TBODY).select("tr");

        for(Element e : tbody) {
            Element nomeAutorizador = e.select("tr td").first();

            if (nomeAutorizador != null) {
                Autorizador autorizador = new Autorizador(null, nomeAutorizador.text());

                String[] linhas = e.select("tr td").toString().split("\n");

                HistoricoAutorizador historico = new HistoricoAutorizador();
                historico.setAutorizador(autorizador);
                historico.setAutorizacao(getImgAttr(linhas[1]));
                historico.setRetornoAutorizacao(getImgAttr(linhas[2]));
                historico.setInutilizacao(getImgAttr(linhas[3]));
                historico.setConsultaProtocolo(getImgAttr(linhas[4]));
                historico.setStatusServico(getImgAttr(linhas[5]));
                historico.setTempoMedio(Jsoup.parse(linhas[6]).body().text());
                historico.setConsultaCadastro(getImgAttr(linhas[7]));
                historico.setRecepcaoEvento(getImgAttr(linhas[8]));

                historicoList.add(historico);
            }
        }

        return historicoList;
    }

    private static ColorStatusEnum getImgAttr(String linha) {
        return fromImgAttrStatus(Jsoup.parse(linha).select("img").attr("src"));
    }

}
