import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavMobile from "../Nav/NavMobile";
import NavWeb from "../Nav/NavWeb";
import Card from "./Card"; // Importa el componente de las cartas
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Sheet,
  SheetTrigger,
} from "../../ui/sheet";
import SheetContent from "./CrearModGrupo";
import { BellIcon } from "@radix-ui/react-icons";

const data = [{"image":"https://nsw.gov.au/nisi/eu/orci.aspx?quam=nisi&nec=vulputate&dui=nonummy&luctus=maecenas&rutrum=tincidunt&nulla=lacus&tellus=at&in=velit&sagittis=vivamus&dui=vel&vel=nulla&nisl=eget&duis=eros&ac=elementum&nibh=pellentesque&fusce=quisque&lacus=porta&purus=volutpat&aliquet=erat&at=quisque&feugiat=erat&non=eros&pretium=viverra&quis=eget&lectus=congue&suspendisse=eget&potenti=semper&in=rutrum&eleifend=nulla&quam=nunc&a=purus&odio=phasellus&in=in&hac=felis&habitasse=donec&platea=semper&dictumst=sapien&maecenas=a&ut=libero&massa=nam&quis=dui&augue=proin&luctus=leo&tincidunt=odio&nulla=porttitor&mollis=id&molestie=consequat&lorem=in&quisque=consequat&ut=ut&erat=nulla&curabitur=sed&gravida=accumsan&nisi=felis&at=ut&nibh=at&in=dolor&hac=quis&habitasse=odio&platea=consequat&dictumst=varius&aliquam=integer&augue=ac&quam=leo&sollicitudin=pellentesque&vitae=ultrices&consectetuer=mattis&eget=odio&rutrum=donec&at=vitae&lorem=nisi&integer=nam&tincidunt=ultrices&ante=libero&vel=non&ipsum=mattis&praesent=pulvinar&blandit=nulla&lacinia=pede&erat=ullamcorper&vestibulum=augue&sed=a&magna=suscipit&at=nulla&nunc=elit&commodo=ac&placerat=nulla&praesent=sed&blandit=vel&nam=enim&nulla=sit&integer=amet&pede=nunc&justo=viverra&lacinia=dapibus","name":"Andie","category":"Carga y transporte","nit":"70-1763270","status":"activo"},
  {"image":"http://yandex.ru/eget/orci/vehicula.html?hac=tincidunt&habitasse=lacus&platea=at&dictumst=velit&maecenas=vivamus&ut=vel","name":"Zacherie","category":"Carga y transporte","nit":"14-3727036","status":"activo"},
  {"image":"https://pinterest.com/velit/donec/diam.jsp?vestibulum=laoreet&sit=ut&amet=rhoncus&cursus=aliquet&id=pulvinar&turpis=sed&integer=nisl&aliquet=nunc&massa=rhoncus&id=dui&lobortis=vel&convallis=sem&tortor=sed&risus=sagittis&dapibus=nam&augue=congue&vel=risus&accumsan=semper&tellus=porta&nisi=volutpat&eu=quam&orci=pede&mauris=lobortis&lacinia=ligula&sapien=sit&quis=amet&libero=eleifend&nullam=pede&sit=libero&amet=quis&turpis=orci&elementum=nullam&ligula=molestie&vehicula=nibh&consequat=in&morbi=lectus&a=pellentesque&ipsum=at&integer=nulla&a=suspendisse&nibh=potenti&in=cras&quis=in&justo=purus&maecenas=eu&rhoncus=magna&aliquam=vulputate&lacus=luctus&morbi=cum&quis=sociis&tortor=natoque&id=penatibus&nulla=et&ultrices=magnis&aliquet=dis&maecenas=parturient&leo=montes&odio=nascetur&condimentum=ridiculus&id=mus&luctus=vivamus&nec=vestibulum&molestie=sagittis&sed=sapien&justo=cum&pellentesque=sociis&viverra=natoque&pede=penatibus&ac=et&diam=magnis&cras=dis&pellentesque=parturient&volutpat=montes&dui=nascetur&maecenas=ridiculus&tristique=mus&est=etiam&et=vel&tempus=augue&semper=vestibulum&est=rutrum&quam=rutrum&pharetra=neque&magna=aenean&ac=auctor&consequat=gravida&metus=sem&sapien=praesent&ut=id&nunc=massa&vestibulum=id&ante=nisl&ipsum=venenatis","name":"Larry","category":"Carga y transporte","nit":"00-6577012","status":"activo"},
  {"image":"https://twitter.com/montes/nascetur/ridiculus.js?id=orci&ornare=vehicula&imperdiet=condimentum&sapien=curabitur&urna=in&pretium=libero&nisl=ut&ut=massa&volutpat=volutpat&sapien=convallis&arcu=morbi&sed=odio&augue=odio&aliquam=elementum&erat=eu&volutpat=interdum&in=eu&congue=tincidunt&etiam=in&justo=leo&etiam=maecenas&pretium=pulvinar&iaculis=lobortis&justo=est&in=phasellus&hac=sit&habitasse=amet&platea=erat&dictumst=nulla&etiam=tempus&faucibus=vivamus&cursus=in&urna=felis&ut=eu&tellus=sapien&nulla=cursus&ut=vestibulum&erat=proin&id=eu&mauris=mi&vulputate=nulla&elementum=ac&nullam=enim&varius=in&nulla=tempor&facilisi=turpis&cras=nec&non=euismod&velit=scelerisque&nec=quam&nisi=turpis&vulputate=adipiscing&nonummy=lorem&maecenas=vitae&tincidunt=mattis&lacus=nibh&at=ligula&velit=nec","name":"Skippie","category":"Carga y transporte","nit":"45-6019390","status":"activo"},
  {"image":"http://go.com/elementum/eu/interdum/eu.jsp?morbi=aliquet&vestibulum=maecenas&velit=leo&id=odio&pretium=condimentum&iaculis=id&diam=luctus&erat=nec&fermentum=molestie&justo=sed&nec=justo&condimentum=pellentesque&neque=viverra&sapien=pede&placerat=ac&ante=diam&nulla=cras&justo=pellentesque&aliquam=volutpat&quis=dui&turpis=maecenas&eget=tristique&elit=est&sodales=et&scelerisque=tempus&mauris=semper&sit=est&amet=quam&eros=pharetra&suspendisse=magna&accumsan=ac&tortor=consequat&quis=metus&turpis=sapien&sed=ut&ante=nunc&vivamus=vestibulum&tortor=ante&duis=ipsum&mattis=primis&egestas=in&metus=faucibus&aenean=orci&fermentum=luctus&donec=et&ut=ultrices&mauris=posuere&eget=cubilia&massa=curae&tempor=mauris&convallis=viverra&nulla=diam&neque=vitae&libero=quam&convallis=suspendisse&eget=potenti&eleifend=nullam&luctus=porttitor&ultricies=lacus&eu=at&nibh=turpis&quisque=donec&id=posuere&justo=metus&sit=vitae&amet=ipsum&sapien=aliquam&dignissim=non&vestibulum=mauris&vestibulum=morbi&ante=non&ipsum=lectus&primis=aliquam","name":"Terra","category":"Carga y transporte","nit":"79-7055956","status":"activo"},
  {"image":"https://twitter.com/erat/volutpat.aspx?habitasse=volutpat&platea=convallis&dictumst=morbi&maecenas=odio&ut=odio&massa=elementum&quis=eu&augue=interdum&luctus=eu&tincidunt=tincidunt&nulla=in&mollis=leo&molestie=maecenas&lorem=pulvinar&quisque=lobortis&ut=est","name":"Evey","category":"Carga y transporte","nit":"14-2435872","status":"activo"},
  {"image":"https://sakura.ne.jp/elementum/in/hac/habitasse/platea.aspx?mus=orci&etiam=eget&vel=orci&augue=vehicula&vestibulum=condimentum&rutrum=curabitur&rutrum=in&neque=libero&aenean=ut&auctor=massa&gravida=volutpat&sem=convallis&praesent=morbi&id=odio&massa=odio&id=elementum&nisl=eu&venenatis=interdum&lacinia=eu&aenean=tincidunt&sit=in&amet=leo&justo=maecenas&morbi=pulvinar&ut=lobortis&odio=est&cras=phasellus&mi=sit&pede=amet&malesuada=erat&in=nulla&imperdiet=tempus&et=vivamus&commodo=in&vulputate=felis&justo=eu&in=sapien&blandit=cursus&ultrices=vestibulum&enim=proin&lorem=eu&ipsum=mi&dolor=nulla&sit=ac&amet=enim&consectetuer=in&adipiscing=tempor&elit=turpis&proin=nec&interdum=euismod&mauris=scelerisque&non=quam&ligula=turpis&pellentesque=adipiscing&ultrices=lorem","name":"Katheryn","category":"Carga y transporte","nit":"18-3891365","status":"activo"},
  {"image":"https://zdnet.com/blandit/nam/nulla/integer.js?semper=et&porta=magnis&volutpat=dis&quam=parturient&pede=montes&lobortis=nascetur&ligula=ridiculus&sit=mus&amet=etiam&eleifend=vel&pede=augue&libero=vestibulum&quis=rutrum&orci=rutrum&nullam=neque&molestie=aenean&nibh=auctor&in=gravida&lectus=sem&pellentesque=praesent&at=id&nulla=massa&suspendisse=id&potenti=nisl&cras=venenatis&in=lacinia&purus=aenean&eu=sit&magna=amet&vulputate=justo&luctus=morbi&cum=ut&sociis=odio&natoque=cras&penatibus=mi&et=pede&magnis=malesuada&dis=in&parturient=imperdiet&montes=et&nascetur=commodo&ridiculus=vulputate&mus=justo&vivamus=in&vestibulum=blandit&sagittis=ultrices&sapien=enim&cum=lorem&sociis=ipsum&natoque=dolor&penatibus=sit&et=amet&magnis=consectetuer&dis=adipiscing&parturient=elit&montes=proin&nascetur=interdum&ridiculus=mauris&mus=non&etiam=ligula&vel=pellentesque&augue=ultrices&vestibulum=phasellus&rutrum=id&rutrum=sapien&neque=in&aenean=sapien&auctor=iaculis&gravida=congue&sem=vivamus&praesent=metus&id=arcu&massa=adipiscing&id=molestie&nisl=hendrerit&venenatis=at&lacinia=vulputate&aenean=vitae&sit=nisl&amet=aenean&justo=lectus&morbi=pellentesque&ut=eget&odio=nunc&cras=donec&mi=quis&pede=orci&malesuada=eget&in=orci&imperdiet=vehicula&et=condimentum&commodo=curabitur&vulputate=in&justo=libero&in=ut&blandit=massa&ultrices=volutpat&enim=convallis&lorem=morbi","name":"Cyrus","category":"Carga y transporte","nit":"78-5250125","status":"activo"},
  {"image":"https://example.com/nisi/volutpat/eleifend/donec/ut/dolor.jsp?sollicitudin=justo&vitae=sollicitudin&consectetuer=ut&eget=suscipit&rutrum=a&at=feugiat&lorem=et&integer=eros&tincidunt=vestibulum&ante=ac&vel=est&ipsum=lacinia&praesent=nisi&blandit=venenatis&lacinia=tristique&erat=fusce&vestibulum=congue&sed=diam&magna=id&at=ornare&nunc=imperdiet&commodo=sapien&placerat=urna&praesent=pretium&blandit=nisl&nam=ut&nulla=volutpat&integer=sapien&pede=arcu&justo=sed&lacinia=augue&eget=aliquam","name":"Codee","category":"Carga y transporte","nit":"82-2449823","status":"activo"},
  {"image":"https://loc.gov/justo/in.png?nisi=nam&at=congue&nibh=risus&in=semper&hac=porta&habitasse=volutpat&platea=quam&dictumst=pede&aliquam=lobortis&augue=ligula&quam=sit&sollicitudin=amet&vitae=eleifend&consectetuer=pede&eget=libero&rutrum=quis&at=orci&lorem=nullam&integer=molestie&tincidunt=nibh&ante=in&vel=lectus&ipsum=pellentesque&praesent=at&blandit=nulla&lacinia=suspendisse&erat=potenti&vestibulum=cras&sed=in&magna=purus&at=eu&nunc=magna&commodo=vulputate&placerat=luctus&praesent=cum&blandit=sociis&nam=natoque&nulla=penatibus&integer=et&pede=magnis&justo=dis&lacinia=parturient&eget=montes&tincidunt=nascetur&eget=ridiculus&tempus=mus&vel=vivamus&pede=vestibulum&morbi=sagittis&porttitor=sapien&lorem=cum&id=sociis&ligula=natoque&suspendisse=penatibus&ornare=et&consequat=magnis&lectus=dis&in=parturient&est=montes&risus=nascetur&auctor=ridiculus&sed=mus&tristique=etiam&in=vel&tempus=augue&sit=vestibulum&amet=rutrum&sem=rutrum&fusce=neque&consequat=aenean&nulla=auctor&nisl=gravida&nunc=sem&nisl=praesent&duis=id&bibendum=massa&felis=id&sed=nisl&interdum=venenatis&venenatis=lacinia&turpis=aenean&enim=sit","name":"Samuele","category":"Carga y transporte","nit":"25-3071517","status":"activo"},
  {"image":"https://walmart.com/libero/nullam/sit/amet/turpis/elementum.jsp?vestibulum=amet&aliquet=sem&ultrices=fusce&erat=consequat&tortor=nulla&sollicitudin=nisl&mi=nunc&sit=nisl&amet=duis&lobortis=bibendum&sapien=felis&sapien=sed&non=interdum&mi=venenatis&integer=turpis&ac=enim&neque=blandit&duis=mi&bibendum=in&morbi=porttitor&non=pede&quam=justo&nec=eu&dui=massa&luctus=donec&rutrum=dapibus&nulla=duis&tellus=at&in=velit&sagittis=eu&dui=est&vel=congue&nisl=elementum&duis=in&ac=hac&nibh=habitasse&fusce=platea&lacus=dictumst&purus=morbi&aliquet=vestibulum&at=velit&feugiat=id&non=pretium&pretium=iaculis&quis=diam&lectus=erat&suspendisse=fermentum&potenti=justo&in=nec&eleifend=condimentum&quam=neque&a=sapien&odio=placerat&in=ante&hac=nulla&habitasse=justo&platea=aliquam&dictumst=quis&maecenas=turpis&ut=eget&massa=elit&quis=sodales&augue=scelerisque&luctus=mauris&tincidunt=sit&nulla=amet&mollis=eros","name":"Valentia","category":"Carga y transporte","nit":"25-0156553","status":"activo"},
  {"image":"https://cafepress.com/tellus/nisi/eu/orci/mauris/lacinia.jpg?vestibulum=velit&quam=id&sapien=pretium&varius=iaculis&ut=diam&blandit=erat&non=fermentum&interdum=justo&in=nec&ante=condimentum&vestibulum=neque&ante=sapien&ipsum=placerat&primis=ante&in=nulla&faucibus=justo&orci=aliquam&luctus=quis&et=turpis&ultrices=eget&posuere=elit&cubilia=sodales&curae=scelerisque&duis=mauris&faucibus=sit&accumsan=amet&odio=eros&curabitur=suspendisse&convallis=accumsan&duis=tortor&consequat=quis&dui=turpis&nec=sed&nisi=ante&volutpat=vivamus&eleifend=tortor&donec=duis&ut=mattis&dolor=egestas&morbi=metus&vel=aenean&lectus=fermentum&in=donec","name":"Vasily","category":"Carga y transporte","nit":"68-3185483","status":"activo"},
  {"image":"https://omniture.com/vestibulum/quam/sapien/varius.png?primis=condimentum&in=curabitur&faucibus=in&orci=libero&luctus=ut&et=massa&ultrices=volutpat&posuere=convallis&cubilia=morbi&curae=odio&mauris=odio&viverra=elementum&diam=eu&vitae=interdum&quam=eu&suspendisse=tincidunt&potenti=in&nullam=leo&porttitor=maecenas&lacus=pulvinar&at=lobortis&turpis=est&donec=phasellus&posuere=sit&metus=amet&vitae=erat&ipsum=nulla&aliquam=tempus&non=vivamus&mauris=in&morbi=felis&non=eu&lectus=sapien","name":"Wendel","category":"Carga y transporte","nit":"11-5327855","status":"activo"},
  {"image":"https://gov.uk/mus/etiam.json?massa=ante&id=vel&nisl=ipsum","name":"Tamara","category":"Carga y transporte","nit":"22-8707163","status":"inactivo"},
  {"image":"https://china.com.cn/dapibus/duis/at/velit/eu/est.jpg?a=at&odio=nunc&in=commodo&hac=placerat&habitasse=praesent&platea=blandit&dictumst=nam&maecenas=nulla&ut=integer&massa=pede&quis=justo&augue=lacinia&luctus=eget&tincidunt=tincidunt&nulla=eget&mollis=tempus&molestie=vel&lorem=pede&quisque=morbi&ut=porttitor&erat=lorem&curabitur=id&gravida=ligula&nisi=suspendisse&at=ornare&nibh=consequat&in=lectus&hac=in&habitasse=est&platea=risus&dictumst=auctor&aliquam=sed&augue=tristique&quam=in","name":"Malissa","category":"Carga y transporte","nit":"61-8815911","status":"activo"},
  {"image":"http://ed.gov/sit/amet.jpg?ipsum=diam&aliquam=neque&non=vestibulum&mauris=eget","name":"Rickert","category":"Carga y transporte","nit":"15-1780383","status":"inactivo"},
  {"image":"http://shareasale.com/dapibus/augue/vel/accumsan/tellus/nisi.json?lorem=neque&id=duis&ligula=bibendum&suspendisse=morbi&ornare=non&consequat=quam&lectus=nec&in=dui&est=luctus&risus=rutrum&auctor=nulla&sed=tellus&tristique=in&in=sagittis&tempus=dui&sit=vel&amet=nisl&sem=duis&fusce=ac&consequat=nibh&nulla=fusce&nisl=lacus&nunc=purus&nisl=aliquet&duis=at&bibendum=feugiat&felis=non&sed=pretium&interdum=quis&venenatis=lectus&turpis=suspendisse&enim=potenti&blandit=in&mi=eleifend&in=quam&porttitor=a&pede=odio&justo=in&eu=hac&massa=habitasse&donec=platea&dapibus=dictumst&duis=maecenas&at=ut&velit=massa&eu=quis&est=augue&congue=luctus&elementum=tincidunt&in=nulla","name":"Pennie","category":"Carga y transporte","nit":"13-5310530","status":"activo"},
  {"image":"https://slideshare.net/augue/a.jsp?volutpat=mauris&quam=eget&pede=massa&lobortis=tempor&ligula=convallis&sit=nulla&amet=neque&eleifend=libero&pede=convallis&libero=eget&quis=eleifend&orci=luctus&nullam=ultricies&molestie=eu&nibh=nibh&in=quisque&lectus=id&pellentesque=justo&at=sit","name":"Dorene","category":"Carga y transporte","nit":"22-1712714","status":"activo"},
  {"image":"http://reverbnation.com/congue/risus.jpg?in=enim&ante=leo&vestibulum=rhoncus&ante=sed&ipsum=vestibulum&primis=sit&in=amet&faucibus=cursus&orci=id&luctus=turpis&et=integer&ultrices=aliquet&posuere=massa&cubilia=id&curae=lobortis&duis=convallis&faucibus=tortor&accumsan=risus&odio=dapibus&curabitur=augue&convallis=vel&duis=accumsan&consequat=tellus&dui=nisi&nec=eu&nisi=orci&volutpat=mauris&eleifend=lacinia&donec=sapien&ut=quis&dolor=libero&morbi=nullam&vel=sit&lectus=amet&in=turpis&quam=elementum&fringilla=ligula&rhoncus=vehicula&mauris=consequat&enim=morbi&leo=a&rhoncus=ipsum&sed=integer&vestibulum=a&sit=nibh&amet=in&cursus=quis&id=justo&turpis=maecenas&integer=rhoncus&aliquet=aliquam&massa=lacus&id=morbi&lobortis=quis&convallis=tortor&tortor=id&risus=nulla&dapibus=ultrices&augue=aliquet","name":"Tamma","category":"Carga y transporte","nit":"40-1668205","status":"activo"},
  {"image":"http://istockphoto.com/vestibulum.jsp?ultrices=auctor&erat=sed&tortor=tristique&sollicitudin=in&mi=tempus&sit=sit&amet=amet&lobortis=sem&sapien=fusce&sapien=consequat&non=nulla&mi=nisl&integer=nunc&ac=nisl&neque=duis&duis=bibendum&bibendum=felis&morbi=sed&non=interdum&quam=venenatis&nec=turpis&dui=enim&luctus=blandit&rutrum=mi&nulla=in&tellus=porttitor&in=pede&sagittis=justo&dui=eu&vel=massa&nisl=donec&duis=dapibus&ac=duis&nibh=at&fusce=velit&lacus=eu&purus=est&aliquet=congue&at=elementum&feugiat=in&non=hac&pretium=habitasse&quis=platea&lectus=dictumst&suspendisse=morbi&potenti=vestibulum&in=velit&eleifend=id&quam=pretium&a=iaculis&odio=diam&in=erat&hac=fermentum&habitasse=justo&platea=nec&dictumst=condimentum&maecenas=neque&ut=sapien&massa=placerat&quis=ante&augue=nulla&luctus=justo&tincidunt=aliquam&nulla=quis&mollis=turpis","name":"Sal","category":"Carga y transporte","nit":"80-8995760","status":"activo"},
  {"image":"https://columbia.edu/integer/ac.jpg?urna=ut&pretium=massa&nisl=volutpat&ut=convallis&volutpat=morbi&sapien=odio&arcu=odio&sed=elementum&augue=eu&aliquam=interdum&erat=eu&volutpat=tincidunt&in=in&congue=leo&etiam=maecenas&justo=pulvinar&etiam=lobortis&pretium=est","name":"Rolfe","category":"Carga y transporte","nit":"33-1870819","status":"activo"},
  {"image":"https://pinterest.com/platea/dictumst/etiam/faucibus/cursus/urna/ut.xml?in=eget&faucibus=congue&orci=eget&luctus=semper&et=rutrum&ultrices=nulla&posuere=nunc&cubilia=purus&curae=phasellus&donec=in&pharetra=felis&magna=donec&vestibulum=semper&aliquet=sapien&ultrices=a&erat=libero&tortor=nam&sollicitudin=dui&mi=proin&sit=leo&amet=odio&lobortis=porttitor&sapien=id&sapien=consequat&non=in&mi=consequat&integer=ut&ac=nulla&neque=sed&duis=accumsan","name":"Ainslie","category":"Carga y transporte","nit":"04-7132338","status":"activo"},
  {"image":"http://over-blog.com/venenatis/turpis/enim/blandit.xml?quam=in&sollicitudin=faucibus&vitae=orci&consectetuer=luctus&eget=et&rutrum=ultrices&at=posuere&lorem=cubilia&integer=curae&tincidunt=donec&ante=pharetra&vel=magna&ipsum=vestibulum&praesent=aliquet&blandit=ultrices&lacinia=erat&erat=tortor&vestibulum=sollicitudin&sed=mi&magna=sit&at=amet&nunc=lobortis&commodo=sapien&placerat=sapien&praesent=non&blandit=mi&nam=integer&nulla=ac&integer=neque&pede=duis&justo=bibendum&lacinia=morbi&eget=non&tincidunt=quam&eget=nec&tempus=dui&vel=luctus&pede=rutrum&morbi=nulla&porttitor=tellus&lorem=in&id=sagittis&ligula=dui&suspendisse=vel&ornare=nisl&consequat=duis&lectus=ac&in=nibh&est=fusce&risus=lacus&auctor=purus&sed=aliquet&tristique=at&in=feugiat&tempus=non&sit=pretium&amet=quis&sem=lectus&fusce=suspendisse&consequat=potenti&nulla=in&nisl=eleifend&nunc=quam&nisl=a&duis=odio&bibendum=in&felis=hac&sed=habitasse&interdum=platea&venenatis=dictumst&turpis=maecenas&enim=ut&blandit=massa&mi=quis&in=augue&porttitor=luctus&pede=tincidunt&justo=nulla&eu=mollis","name":"Tillie","category":"Carga y transporte","nit":"07-9824655","status":"activo"},
  {"image":"http://wix.com/vestibulum/ante.xml?amet=penatibus&cursus=et&id=magnis&turpis=dis&integer=parturient&aliquet=montes&massa=nascetur&id=ridiculus&lobortis=mus&convallis=vivamus&tortor=vestibulum&risus=sagittis&dapibus=sapien&augue=cum&vel=sociis&accumsan=natoque&tellus=penatibus&nisi=et&eu=magnis&orci=dis&mauris=parturient&lacinia=montes&sapien=nascetur&quis=ridiculus&libero=mus&nullam=etiam&sit=vel&amet=augue&turpis=vestibulum&elementum=rutrum&ligula=rutrum&vehicula=neque&consequat=aenean","name":"Mariejeanne","category":"Carga y transporte","nit":"15-7437505","status":"activo"},
  {"image":"https://vimeo.com/in/faucibus/orci/luctus/et/ultrices/posuere.png?quis=cubilia&lectus=curae&suspendisse=donec&potenti=pharetra&in=magna&eleifend=vestibulum&quam=aliquet&a=ultrices&odio=erat&in=tortor&hac=sollicitudin&habitasse=mi&platea=sit&dictumst=amet&maecenas=lobortis&ut=sapien&massa=sapien&quis=non&augue=mi&luctus=integer&tincidunt=ac&nulla=neque","name":"Edan","category":"Carga y transporte","nit":"70-3490483","status":"activo"},
  {"image":"http://ocn.ne.jp/elementum/ligula/vehicula/consequat/morbi/a/ipsum.png?pretium=etiam&iaculis=justo&diam=etiam&erat=pretium&fermentum=iaculis&justo=justo&nec=in&condimentum=hac&neque=habitasse","name":"Abel","category":"Carga y transporte","nit":"48-7975704","status":"activo"},
  {"image":"https://dagondesign.com/vel/augue/vestibulum/ante/ipsum.jpg?turpis=odio&sed=elementum&ante=eu&vivamus=interdum&tortor=eu&duis=tincidunt&mattis=in&egestas=leo&metus=maecenas&aenean=pulvinar&fermentum=lobortis&donec=est&ut=phasellus&mauris=sit&eget=amet&massa=erat&tempor=nulla&convallis=tempus&nulla=vivamus&neque=in&libero=felis&convallis=eu&eget=sapien&eleifend=cursus&luctus=vestibulum&ultricies=proin&eu=eu&nibh=mi&quisque=nulla&id=ac&justo=enim&sit=in&amet=tempor&sapien=turpis&dignissim=nec&vestibulum=euismod&vestibulum=scelerisque&ante=quam&ipsum=turpis&primis=adipiscing&in=lorem&faucibus=vitae&orci=mattis&luctus=nibh&et=ligula&ultrices=nec&posuere=sem&cubilia=duis&curae=aliquam&nulla=convallis&dapibus=nunc&dolor=proin&vel=at&est=turpis","name":"Peyter","category":"Carga y transporte","nit":"02-3595370","status":"activo"},
  {"image":"http://de.vu/sapien/iaculis/congue/vivamus/metus/arcu.jpg?nisl=felis&nunc=sed&nisl=interdum&duis=venenatis&bibendum=turpis&felis=enim&sed=blandit&interdum=mi&venenatis=in&turpis=porttitor&enim=pede&blandit=justo&mi=eu&in=massa&porttitor=donec&pede=dapibus&justo=duis&eu=at&massa=velit&donec=eu&dapibus=est&duis=congue&at=elementum&velit=in&eu=hac&est=habitasse&congue=platea&elementum=dictumst&in=morbi&hac=vestibulum&habitasse=velit&platea=id&dictumst=pretium&morbi=iaculis&vestibulum=diam&velit=erat&id=fermentum&pretium=justo&iaculis=nec&diam=condimentum&erat=neque&fermentum=sapien&justo=placerat&nec=ante&condimentum=nulla&neque=justo&sapien=aliquam&placerat=quis&ante=turpis&nulla=eget&justo=elit&aliquam=sodales&quis=scelerisque&turpis=mauris&eget=sit&elit=amet&sodales=eros&scelerisque=suspendisse&mauris=accumsan&sit=tortor&amet=quis&eros=turpis&suspendisse=sed&accumsan=ante&tortor=vivamus&quis=tortor&turpis=duis&sed=mattis&ante=egestas&vivamus=metus&tortor=aenean&duis=fermentum&mattis=donec&egestas=ut&metus=mauris&aenean=eget&fermentum=massa&donec=tempor&ut=convallis&mauris=nulla&eget=neque&massa=libero&tempor=convallis&convallis=eget&nulla=eleifend&neque=luctus&libero=ultricies&convallis=eu&eget=nibh&eleifend=quisque&luctus=id&ultricies=justo&eu=sit&nibh=amet&quisque=sapien","name":"Clemmy","category":"Carga y transporte","nit":"10-6712496","status":"activo"},
  {"image":"https://histats.com/accumsan/tortor/quis/turpis.jsp?pede=pellentesque&ac=volutpat&diam=dui&cras=maecenas&pellentesque=tristique&volutpat=est&dui=et&maecenas=tempus&tristique=semper&est=est&et=quam&tempus=pharetra&semper=magna&est=ac&quam=consequat&pharetra=metus&magna=sapien&ac=ut&consequat=nunc&metus=vestibulum&sapien=ante&ut=ipsum&nunc=primis&vestibulum=in&ante=faucibus&ipsum=orci&primis=luctus&in=et&faucibus=ultrices&orci=posuere&luctus=cubilia&et=curae&ultrices=mauris&posuere=viverra&cubilia=diam&curae=vitae&mauris=quam&viverra=suspendisse&diam=potenti&vitae=nullam&quam=porttitor&suspendisse=lacus&potenti=at&nullam=turpis&porttitor=donec&lacus=posuere&at=metus&turpis=vitae&donec=ipsum&posuere=aliquam&metus=non&vitae=mauris&ipsum=morbi&aliquam=non&non=lectus&mauris=aliquam&morbi=sit&non=amet&lectus=diam&aliquam=in&sit=magna&amet=bibendum&diam=imperdiet&in=nullam&magna=orci&bibendum=pede&imperdiet=venenatis&nullam=non","name":"Janina","category":"Carga y transporte","nit":"01-9920941","status":"activo"},
  {"image":"https://newyorker.com/porttitor/id/consequat/in/consequat.png?tincidunt=nisi&lacus=volutpat&at=eleifend&velit=donec&vivamus=ut&vel=dolor&nulla=morbi&eget=vel&eros=lectus&elementum=in&pellentesque=quam&quisque=fringilla&porta=rhoncus&volutpat=mauris&erat=enim&quisque=leo&erat=rhoncus&eros=sed&viverra=vestibulum&eget=sit&congue=amet&eget=cursus&semper=id&rutrum=turpis&nulla=integer&nunc=aliquet&purus=massa&phasellus=id&in=lobortis&felis=convallis&donec=tortor&semper=risus&sapien=dapibus&a=augue&libero=vel&nam=accumsan&dui=tellus&proin=nisi&leo=eu&odio=orci&porttitor=mauris&id=lacinia&consequat=sapien&in=quis&consequat=libero&ut=nullam&nulla=sit&sed=amet&accumsan=turpis&felis=elementum&ut=ligula&at=vehicula&dolor=consequat&quis=morbi&odio=a&consequat=ipsum&varius=integer&integer=a&ac=nibh&leo=in&pellentesque=quis&ultrices=justo&mattis=maecenas&odio=rhoncus","name":"Kenn","category":"Carga y transporte","nit":"74-6037968","status":"activo"}];
const GruposEmpresas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null); 
  const itemsPerPage = 6; // Ajusta este valor según sea necesario
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    // Store data in local storage
    localStorage.setItem('groupData', JSON.stringify(row));
    // Navigate to the detail page
    navigate('/admin/gruposvista/grupos/groupdetail');
  };

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };


  

  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ["name", "email", "id"].some((key) => {
          const value = item[key];
          return typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter]);
  const toggleStatusFilter = (status) => {
    if (statusFilter === status) {
      setStatusFilter(null); // Si el filtro ya está activo, se desactiva
    } else {
      setStatusFilter(status.toLowerCase()); // Convertir a minúsculas para coincidir con los datos
    }
  };
  // Datos para la página actual
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData]);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 9;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (currentPage <= 5) {
        for (let i = 1; i <= 6; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pageNumbers.push(<span key="dots-1">...</span>);
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (currentPage >= totalPages - 4) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        pageNumbers.push(<span key="dots-2">...</span>);
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        pageNumbers.push(<span key="dots-3">...</span>);
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pageNumbers.push(<span key="dots-4">...</span>);
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pageNumbers;
  };
  const dataprueba = {
    profileImage: "profilephoto.jpeg",
    name: "",
    email: "",
    dob: "",
    country: ""
  };

  return (
    <div className="min-h-screen flex" style={{ overflowY: 'hidden', height: '100vh',}}>
      <NavMobile />
      <NavWeb />

      <div className="flex-1 p-6" style={{ overflowY: 'scroll'}}>
      <div className="bg-white rounded-lg flex justify-between items-center p-5">
            <h2 className="text-xl font-bold text-gray-900">
              Lista de grupos
            </h2>
            <BellIcon className="h-6 w-6" />
      </div>
        <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search by name or ID"
          className="w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          {/* Botones de filtros */}
        <Button
          variant={statusFilter === "activo" ? "solid" : "outline"}
          onClick={() => toggleStatusFilter("Activo")}
          className={statusFilter === "activo" ? "bg-green-500 text-white" : ""}
        >
          Activo
        </Button>
        <Button
          variant={statusFilter === "inactivo" ? "solid" : "outline"}
          onClick={() => toggleStatusFilter("Inactivo")}
          className={statusFilter === "inactivo" ? "bg-red-500 text-white" : ""}
        >
          Inactivo
        </Button>
          <Button variant="ghost" onClick={() => {
            setStatusFilter(null); 
            setSearchTerm("");
          }}>Borrar filtros</Button>
          <Sheet>
            <SheetTrigger asChild>
              {/* Este botón será visible solo en pantallas pequeñas */}
              <Button>
                Crear nuevo grupo +
              </Button>
            </SheetTrigger>
            <SheetContent data={dataprueba} />
          </Sheet>
        </div>

        {/* Sección de Cartas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {currentItems.map((item, index) => (
            <Card
              key={index}
              image={item.image}
              name={item.name}
              category={item.category}
              nit={item.nit}
              status={item.status}
              onClick={() => handleRowClick(item)}
            />
          ))}
        </div>

        {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
    </div>
  );
};

export default GruposEmpresas;