"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Map = () => {
  const icon = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    className: "object-contain",
  });
  return (
    <div className="!-z-10 ">
      <h1 className="text-lg font-semibold text-gray-800">Where we are?</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Finland</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Kuopio</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Keskusta</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="h-[40vh] w-full pointer-events-none">
        <MapContainer
          center={[62.8924, 27.6778]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[62.8924, 27.6778]} icon={icon}>
            <Popup>
              <div className="flex gap-1 w-full">
                {/* <Image src={item?.images[0]} alt='' width={50} height={50}/> */}

                <b>$ </b>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
