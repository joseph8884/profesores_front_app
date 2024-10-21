import React, { useState } from "react";
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

const data = [{"image":"http://oaic.gov.au/suspendisse.html?donec=erat&vitae=id&nisi=mauris&nam=vulputate&ultrices=elementum&libero=nullam&non=varius&mattis=nulla","name":"Eayo","category":"Carga y transporte","nit":"70-4807675"},
  {"image":"https://upenn.edu/posuere/cubilia.json?eget=ut&tempus=massa&vel=quis&pede=augue&morbi=luctus&porttitor=tincidunt&lorem=nulla&id=mollis&ligula=molestie&suspendisse=lorem&ornare=quisque&consequat=ut&lectus=erat&in=curabitur&est=gravida&risus=nisi&auctor=at&sed=nibh&tristique=in&in=hac&tempus=habitasse&sit=platea&amet=dictumst&sem=aliquam&fusce=augue&consequat=quam&nulla=sollicitudin&nisl=vitae&nunc=consectetuer&nisl=eget&duis=rutrum&bibendum=at&felis=lorem&sed=integer&interdum=tincidunt&venenatis=ante&turpis=vel&enim=ipsum&blandit=praesent&mi=blandit&in=lacinia&porttitor=erat&pede=vestibulum&justo=sed&eu=magna&massa=at&donec=nunc&dapibus=commodo&duis=placerat&at=praesent&velit=blandit&eu=nam&est=nulla&congue=integer&elementum=pede&in=justo&hac=lacinia&habitasse=eget&platea=tincidunt&dictumst=eget&morbi=tempus&vestibulum=vel&velit=pede&id=morbi&pretium=porttitor&iaculis=lorem&diam=id&erat=ligula&fermentum=suspendisse&justo=ornare&nec=consequat","name":"Dynabox","category":"Carga y transporte","nit":"66-3383066"},
  {"image":"http://princeton.edu/elit/proin.js?sapien=nibh&sapien=in&non=lectus&mi=pellentesque&integer=at&ac=nulla&neque=suspendisse&duis=potenti&bibendum=cras&morbi=in&non=purus&quam=eu&nec=magna","name":"Abatz","category":"Carga y transporte","nit":"52-6387718"},
  {"image":"https://zimbio.com/feugiat.xml?eu=dolor&est=morbi&congue=vel&elementum=lectus&in=in&hac=quam&habitasse=fringilla&platea=rhoncus&dictumst=mauris&morbi=enim&vestibulum=leo&velit=rhoncus&id=sed&pretium=vestibulum&iaculis=sit&diam=amet&erat=cursus&fermentum=id&justo=turpis&nec=integer&condimentum=aliquet&neque=massa&sapien=id&placerat=lobortis&ante=convallis&nulla=tortor&justo=risus&aliquam=dapibus&quis=augue&turpis=vel&eget=accumsan&elit=tellus&sodales=nisi&scelerisque=eu&mauris=orci&sit=mauris&amet=lacinia&eros=sapien&suspendisse=quis&accumsan=libero&tortor=nullam&quis=sit&turpis=amet&sed=turpis&ante=elementum&vivamus=ligula&tortor=vehicula&duis=consequat&mattis=morbi&egestas=a&metus=ipsum&aenean=integer","name":"Eabox","category":"Carga y transporte","nit":"81-9016824"},
  {"image":"http://blogspot.com/tellus/nisi/eu/orci.html?lacus=vel&at=augue&turpis=vestibulum&donec=ante&posuere=ipsum&metus=primis&vitae=in&ipsum=faucibus&aliquam=orci&non=luctus&mauris=et&morbi=ultrices&non=posuere&lectus=cubilia&aliquam=curae&sit=donec&amet=pharetra&diam=magna&in=vestibulum&magna=aliquet&bibendum=ultrices&imperdiet=erat&nullam=tortor&orci=sollicitudin&pede=mi&venenatis=sit&non=amet&sodales=lobortis&sed=sapien&tincidunt=sapien&eu=non&felis=mi&fusce=integer&posuere=ac&felis=neque&sed=duis&lacus=bibendum&morbi=morbi&sem=non&mauris=quam&laoreet=nec&ut=dui&rhoncus=luctus&aliquet=rutrum&pulvinar=nulla&sed=tellus&nisl=in&nunc=sagittis&rhoncus=dui&dui=vel&vel=nisl&sem=duis&sed=ac&sagittis=nibh&nam=fusce&congue=lacus&risus=purus&semper=aliquet&porta=at&volutpat=feugiat&quam=non&pede=pretium&lobortis=quis&ligula=lectus&sit=suspendisse&amet=potenti&eleifend=in&pede=eleifend&libero=quam&quis=a&orci=odio&nullam=in&molestie=hac&nibh=habitasse","name":"Zoombox","category":"Carga y transporte","nit":"81-2684905"},
  {"image":"http://networkadvertising.org/consequat.js?rhoncus=sit&dui=amet&vel=eros&sem=suspendisse&sed=accumsan&sagittis=tortor&nam=quis&congue=turpis&risus=sed&semper=ante&porta=vivamus&volutpat=tortor&quam=duis&pede=mattis&lobortis=egestas&ligula=metus&sit=aenean&amet=fermentum&eleifend=donec&pede=ut&libero=mauris&quis=eget&orci=massa&nullam=tempor&molestie=convallis&nibh=nulla&in=neque&lectus=libero&pellentesque=convallis&at=eget&nulla=eleifend&suspendisse=luctus&potenti=ultricies&cras=eu&in=nibh&purus=quisque&eu=id&magna=justo&vulputate=sit&luctus=amet&cum=sapien&sociis=dignissim&natoque=vestibulum&penatibus=vestibulum&et=ante&magnis=ipsum&dis=primis&parturient=in&montes=faucibus&nascetur=orci&ridiculus=luctus&mus=et&vivamus=ultrices&vestibulum=posuere&sagittis=cubilia&sapien=curae&cum=nulla&sociis=dapibus&natoque=dolor&penatibus=vel&et=est&magnis=donec&dis=odio&parturient=justo&montes=sollicitudin&nascetur=ut&ridiculus=suscipit&mus=a&etiam=feugiat&vel=et&augue=eros&vestibulum=vestibulum&rutrum=ac&rutrum=est&neque=lacinia&aenean=nisi&auctor=venenatis&gravida=tristique&sem=fusce&praesent=congue&id=diam&massa=id&id=ornare&nisl=imperdiet","name":"Realcube","category":"Carga y transporte","nit":"79-9081424"},
  {"image":"https://mozilla.org/fusce/congue/diam/id/ornare/imperdiet.png?elementum=in&pellentesque=faucibus&quisque=orci&porta=luctus&volutpat=et&erat=ultrices&quisque=posuere&erat=cubilia&eros=curae&viverra=mauris&eget=viverra&congue=diam&eget=vitae&semper=quam&rutrum=suspendisse&nulla=potenti&nunc=nullam&purus=porttitor&phasellus=lacus&in=at&felis=turpis&donec=donec&semper=posuere&sapien=metus&a=vitae&libero=ipsum&nam=aliquam&dui=non&proin=mauris&leo=morbi&odio=non&porttitor=lectus&id=aliquam&consequat=sit&in=amet&consequat=diam&ut=in&nulla=magna&sed=bibendum&accumsan=imperdiet&felis=nullam&ut=orci&at=pede&dolor=venenatis&quis=non&odio=sodales&consequat=sed&varius=tincidunt&integer=eu&ac=felis&leo=fusce&pellentesque=posuere&ultrices=felis&mattis=sed&odio=lacus&donec=morbi&vitae=sem&nisi=mauris&nam=laoreet&ultrices=ut&libero=rhoncus&non=aliquet&mattis=pulvinar&pulvinar=sed&nulla=nisl&pede=nunc&ullamcorper=rhoncus&augue=dui&a=vel&suscipit=sem&nulla=sed&elit=sagittis&ac=nam&nulla=congue&sed=risus&vel=semper&enim=porta&sit=volutpat&amet=quam&nunc=pede&viverra=lobortis&dapibus=ligula&nulla=sit&suscipit=amet&ligula=eleifend&in=pede&lacus=libero&curabitur=quis&at=orci&ipsum=nullam&ac=molestie","name":"Katz","category":"Carga y transporte","nit":"30-5950558"},
  {"image":"http://rakuten.co.jp/vestibulum/ante/ipsum/primis/in/faucibus/orci.jpg?suspendisse=pellentesque&potenti=quisque&cras=porta&in=volutpat&purus=erat&eu=quisque&magna=erat&vulputate=eros&luctus=viverra&cum=eget&sociis=congue&natoque=eget&penatibus=semper&et=rutrum&magnis=nulla&dis=nunc&parturient=purus&montes=phasellus&nascetur=in&ridiculus=felis&mus=donec&vivamus=semper&vestibulum=sapien&sagittis=a&sapien=libero&cum=nam&sociis=dui&natoque=proin&penatibus=leo&et=odio&magnis=porttitor&dis=id&parturient=consequat&montes=in&nascetur=consequat&ridiculus=ut&mus=nulla&etiam=sed&vel=accumsan&augue=felis&vestibulum=ut&rutrum=at&rutrum=dolor&neque=quis&aenean=odio&auctor=consequat&gravida=varius&sem=integer&praesent=ac&id=leo&massa=pellentesque&id=ultrices&nisl=mattis&venenatis=odio&lacinia=donec&aenean=vitae&sit=nisi&amet=nam","name":"Rhyloo","category":"Carga y transporte","nit":"66-7150229"},
  {"image":"https://slashdot.org/neque.aspx?rhoncus=a&aliquam=pede&lacus=posuere&morbi=nonummy&quis=integer&tortor=non&id=velit&nulla=donec&ultrices=diam&aliquet=neque&maecenas=vestibulum&leo=eget&odio=vulputate&condimentum=ut&id=ultrices&luctus=vel&nec=augue&molestie=vestibulum&sed=ante&justo=ipsum&pellentesque=primis&viverra=in&pede=faucibus&ac=orci&diam=luctus&cras=et&pellentesque=ultrices&volutpat=posuere&dui=cubilia&maecenas=curae&tristique=donec&est=pharetra&et=magna&tempus=vestibulum&semper=aliquet&est=ultrices&quam=erat","name":"Fiveclub","category":"Carga y transporte","nit":"35-7637731"},
  {"image":"http://dagondesign.com/vel/augue/vestibulum/rutrum/rutrum/neque/aenean.xml?nulla=ante&pede=vivamus&ullamcorper=tortor&augue=duis&a=mattis&suscipit=egestas&nulla=metus&elit=aenean&ac=fermentum&nulla=donec&sed=ut&vel=mauris&enim=eget&sit=massa&amet=tempor&nunc=convallis&viverra=nulla&dapibus=neque&nulla=libero","name":"Cogidoo","category":"Carga y transporte","nit":"06-3783565"},
  {"image":"https://amazon.co.uk/cras/pellentesque/volutpat/dui/maecenas/tristique/est.jpg?augue=sit&aliquam=amet&erat=diam&volutpat=in&in=magna&congue=bibendum&etiam=imperdiet&justo=nullam&etiam=orci&pretium=pede&iaculis=venenatis&justo=non&in=sodales&hac=sed&habitasse=tincidunt&platea=eu&dictumst=felis","name":"Ozu","category":"Carga y transporte","nit":"38-6152173"},
  {"image":"https://istockphoto.com/adipiscing/elit.aspx?quis=ornare&justo=consequat&maecenas=lectus&rhoncus=in&aliquam=est&lacus=risus&morbi=auctor&quis=sed&tortor=tristique&id=in&nulla=tempus&ultrices=sit&aliquet=amet&maecenas=sem&leo=fusce&odio=consequat&condimentum=nulla&id=nisl&luctus=nunc&nec=nisl&molestie=duis&sed=bibendum&justo=felis&pellentesque=sed&viverra=interdum&pede=venenatis&ac=turpis&diam=enim&cras=blandit&pellentesque=mi&volutpat=in&dui=porttitor&maecenas=pede&tristique=justo&est=eu&et=massa&tempus=donec&semper=dapibus&est=duis&quam=at&pharetra=velit&magna=eu&ac=est&consequat=congue&metus=elementum&sapien=in&ut=hac&nunc=habitasse&vestibulum=platea&ante=dictumst&ipsum=morbi&primis=vestibulum&in=velit&faucibus=id&orci=pretium&luctus=iaculis&et=diam&ultrices=erat&posuere=fermentum&cubilia=justo&curae=nec","name":"Dynabox","category":"Carga y transporte","nit":"61-9156595"},
  {"image":"https://fda.gov/nisl.jpg?urna=donec&pretium=quis&nisl=orci&ut=eget&volutpat=orci&sapien=vehicula&arcu=condimentum&sed=curabitur&augue=in&aliquam=libero&erat=ut&volutpat=massa&in=volutpat&congue=convallis&etiam=morbi&justo=odio&etiam=odio&pretium=elementum&iaculis=eu&justo=interdum&in=eu&hac=tincidunt&habitasse=in&platea=leo&dictumst=maecenas&etiam=pulvinar&faucibus=lobortis&cursus=est&urna=phasellus&ut=sit&tellus=amet&nulla=erat&ut=nulla&erat=tempus&id=vivamus&mauris=in&vulputate=felis&elementum=eu&nullam=sapien&varius=cursus&nulla=vestibulum&facilisi=proin&cras=eu&non=mi&velit=nulla&nec=ac&nisi=enim&vulputate=in&nonummy=tempor&maecenas=turpis&tincidunt=nec&lacus=euismod&at=scelerisque&velit=quam&vivamus=turpis&vel=adipiscing&nulla=lorem&eget=vitae&eros=mattis&elementum=nibh&pellentesque=ligula","name":"Meezzy","category":"Carga y transporte","nit":"55-1536170"},
  {"image":"https://nationalgeographic.com/metus/aenean/fermentum/donec/ut/mauris/eget.jsp?sapien=in&arcu=quam&sed=fringilla&augue=rhoncus&aliquam=mauris&erat=enim&volutpat=leo&in=rhoncus&congue=sed&etiam=vestibulum&justo=sit&etiam=amet&pretium=cursus&iaculis=id","name":"Kamba","category":"Carga y transporte","nit":"54-0110553"},
  {"image":"https://webs.com/pede/justo/lacinia.js?ut=nisl&nulla=nunc&sed=nisl&accumsan=duis&felis=bibendum&ut=felis&at=sed&dolor=interdum&quis=venenatis&odio=turpis&consequat=enim&varius=blandit&integer=mi&ac=in&leo=porttitor&pellentesque=pede&ultrices=justo&mattis=eu&odio=massa&donec=donec&vitae=dapibus&nisi=duis&nam=at&ultrices=velit&libero=eu&non=est&mattis=congue&pulvinar=elementum&nulla=in&pede=hac&ullamcorper=habitasse&augue=platea&a=dictumst&suscipit=morbi&nulla=vestibulum&elit=velit&ac=id&nulla=pretium&sed=iaculis&vel=diam&enim=erat&sit=fermentum&amet=justo&nunc=nec&viverra=condimentum&dapibus=neque&nulla=sapien&suscipit=placerat&ligula=ante&in=nulla&lacus=justo&curabitur=aliquam&at=quis&ipsum=turpis&ac=eget&tellus=elit&semper=sodales&interdum=scelerisque&mauris=mauris&ullamcorper=sit&purus=amet&sit=eros&amet=suspendisse&nulla=accumsan&quisque=tortor&arcu=quis&libero=turpis&rutrum=sed&ac=ante","name":"Centizu","category":"Carga y transporte","nit":"61-3387724"},
  {"image":"http://spotify.com/mauris/ullamcorper/purus/sit/amet.json?justo=dignissim&etiam=vestibulum&pretium=vestibulum&iaculis=ante&justo=ipsum&in=primis&hac=in&habitasse=faucibus&platea=orci&dictumst=luctus&etiam=et&faucibus=ultrices&cursus=posuere&urna=cubilia&ut=curae&tellus=nulla&nulla=dapibus&ut=dolor&erat=vel&id=est&mauris=donec&vulputate=odio&elementum=justo&nullam=sollicitudin&varius=ut&nulla=suscipit&facilisi=a&cras=feugiat&non=et&velit=eros&nec=vestibulum&nisi=ac&vulputate=est&nonummy=lacinia&maecenas=nisi&tincidunt=venenatis&lacus=tristique&at=fusce&velit=congue&vivamus=diam&vel=id&nulla=ornare","name":"Fanoodle","category":"Carga y transporte","nit":"03-4388093"},
  {"image":"https://shutterfly.com/tempor/turpis.xml?elit=sed&ac=accumsan&nulla=felis&sed=ut&vel=at&enim=dolor&sit=quis&amet=odio&nunc=consequat&viverra=varius&dapibus=integer&nulla=ac&suscipit=leo&ligula=pellentesque&in=ultrices&lacus=mattis&curabitur=odio&at=donec&ipsum=vitae&ac=nisi&tellus=nam&semper=ultrices&interdum=libero&mauris=non&ullamcorper=mattis&purus=pulvinar&sit=nulla&amet=pede&nulla=ullamcorper&quisque=augue&arcu=a&libero=suscipit&rutrum=nulla&ac=elit&lobortis=ac&vel=nulla&dapibus=sed","name":"Yotz","category":"Carga y transporte","nit":"27-9884516"},
  {"image":"https://cdc.gov/consequat/nulla/nisl/nunc.html?augue=ornare&a=imperdiet&suscipit=sapien&nulla=urna&elit=pretium&ac=nisl&nulla=ut&sed=volutpat&vel=sapien&enim=arcu&sit=sed&amet=augue&nunc=aliquam&viverra=erat&dapibus=volutpat&nulla=in&suscipit=congue&ligula=etiam&in=justo&lacus=etiam&curabitur=pretium&at=iaculis&ipsum=justo&ac=in&tellus=hac&semper=habitasse&interdum=platea&mauris=dictumst&ullamcorper=etiam&purus=faucibus&sit=cursus&amet=urna&nulla=ut&quisque=tellus&arcu=nulla&libero=ut&rutrum=erat&ac=id&lobortis=mauris&vel=vulputate&dapibus=elementum&at=nullam&diam=varius","name":"Browsetype","category":"Carga y transporte","nit":"90-5340239"},
  {"image":"https://washington.edu/non.png?luctus=nulla&et=nunc&ultrices=purus&posuere=phasellus&cubilia=in&curae=felis&nulla=donec&dapibus=semper&dolor=sapien&vel=a&est=libero&donec=nam&odio=dui","name":"Quimba","category":"Carga y transporte","nit":"15-7291433"},
  {"image":"http://goo.gl/ut/massa/volutpat.xml?convallis=elementum&eget=eu&eleifend=interdum&luctus=eu&ultricies=tincidunt&eu=in&nibh=leo&quisque=maecenas&id=pulvinar&justo=lobortis&sit=est&amet=phasellus&sapien=sit&dignissim=amet&vestibulum=erat&vestibulum=nulla&ante=tempus&ipsum=vivamus&primis=in&in=felis&faucibus=eu&orci=sapien&luctus=cursus&et=vestibulum&ultrices=proin&posuere=eu&cubilia=mi&curae=nulla&nulla=ac&dapibus=enim&dolor=in&vel=tempor&est=turpis&donec=nec&odio=euismod&justo=scelerisque&sollicitudin=quam&ut=turpis&suscipit=adipiscing&a=lorem&feugiat=vitae&et=mattis&eros=nibh&vestibulum=ligula&ac=nec&est=sem&lacinia=duis&nisi=aliquam&venenatis=convallis&tristique=nunc&fusce=proin&congue=at&diam=turpis","name":"Layo","category":"Carga y transporte","nit":"31-8112625"}];

const GruposEmpresas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Ajusta este valor según sea necesario
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    // Store data in local storage
    localStorage.setItem('groupData', JSON.stringify(row));
    // Navigate to the detail page
    navigate('/groupdetail');
  };

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Datos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Name, email or id of the student"
            className="w-96"
          />
          <Button variant="ghost">Borrar filtros</Button>
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
              onClick={() => handleRowClick(item)}
            />
          ))}
        </div>

        {/* Paginación */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((page) => (
              <PaginationItem key={page + 1}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                  isActive={currentPage === page + 1}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
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