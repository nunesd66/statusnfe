package com.nunesd66.enumeration;

import lombok.Getter;

import static com.nunesd66.constants.NfeFazendaGovConstants.*;

@Getter
public enum ColorStatusEnum {
    VERMELHO(IMG_ATTR_STATUS_VERMELHA),
    AMARELA(IMG_ATTR_STATUS_AMARELA),
    VERDE(IMG_ATTR_STATUS_VERDE),
    EM_BRANCO(IMG_ATTR_STATUS_EM_BRANCO);

    private String imgAttrStatus;

    ColorStatusEnum(String imgAttrStatus) {
        this.imgAttrStatus = imgAttrStatus;
    }

    public static ColorStatusEnum fromImgAttrStatus(String imgAttrStatus) {
        for (ColorStatusEnum status : ColorStatusEnum.values()) {
            if (status.getImgAttrStatus().equals(imgAttrStatus)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Nenhum ColorStatusEnum referente a: " + imgAttrStatus);
    }
}
