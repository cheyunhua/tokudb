/*
 Copyright (c) 2012, Oracle and/or its affiliates. All rights
 reserved.
 
 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; version 2 of
 the License.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 02110-1301  USA
 */

var spi        = require(spi_module),
    service    = spi.getDBServiceProvider(global.adapter),
    properties = global.test_conn_properties,
    udebug     = unified_debug.getLogger("spi/lib.js");
    
var spi_test_connection = null;


exports.getConnectionPool = function(userCallback) {
  udebug.log("getConnectionPool");

  var p = global.test_conn_properties;
  if(p) {
    // todo: merge 
  }

  function onConnect(err, conn) {
    udebug.log("getConnectionPool onConnect");    
    userCallback(err, conn);
    spi_test_connection = conn;
  }

  if(! spi_test_connection) {
    spi_test_connection = service.connect(properties, onConnect);
  }
  else {
    udebug.log("getConnectionPool returning pre-established connection");
    userCallback(null, spi_test_connection);
  }
};


exports.closeConnectionPool = function() {
  if(spi_test_connection) {
    spi_test_connection.closeSync();
  }
};


