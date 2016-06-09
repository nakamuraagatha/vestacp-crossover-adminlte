/**
 * Created by Louis on 5/6/2016.
 */
/// <reference path="jquery.d.ts" />
"use strict";
var LouisAdminLTE = (function () {
    function LouisAdminLTE() {
    }
    LouisAdminLTE.prototype.initUI = function () {
        var body = $("body");
        var wrapper;
        body.addClass("skin-blue sidebar-mini");
        // Wrap All Content first
        body.wrapInner('<div class="content-wrapper"></div>');
        body.wrapInner('<div class="wrapper" />');
        wrapper = $(".wrapper");
        // Load Template
        $.get("/adminlte/view/template.php", function (html) {
            body.show();
            var template = $(html);
            var sidebar = template.find(".main-sidebar");
            var sidebarMenu = sidebar.find(".sidebar-menu");
            var header = template.find(".main-header");
            wrapper.prepend(header);
            wrapper.prepend(sidebar);
            header.find(".username").text($(".l-profile__username").text());
            header.find(".btn-profile").attr("href", $(".l-profile__username").attr("href"));
            header.find(".btn-logout").attr("href", $(".l-profile__logout").attr("href"));
            // Menu items
            $(".l-stat .l-stat__col").each(function () {
                var name = LouisAdminLTE.ucFirst($(this).find(".l-stat__col-title").text());
                var url = $(this).find("a").attr("href");
                var number = LouisAdminLTE.ucFirst($(this).find("ul li:first-child span").text());
                var item = $("<li><a href=''><i class='fa'></i> <span></span><small class='label pull-right  bg-green'>new</small></li>");
                if ($(this).hasClass("l-stat__col--active")) {
                    item.addClass("active");
                }
                item.find("a").attr("href", url);
                item.find(".label").text(number);
                if (url == "/list/user/") {
                    item.find(".fa").addClass("fa-user");
                    item.find("span").text(name);
                }
                else if (url == "/list/web/") {
                    item.find(".fa").addClass("fa-server");
                    item.find("span").text(name);
                }
                else if (url == "/list/dns/") {
                    item.find(".fa").addClass("fa-share-square-o");
                    item.find("span").text(name.replace("Dns", "DNS"));
                }
                else if (url == "/list/mail/") {
                    item.find(".fa").addClass("fa-envelope");
                    item.find("span").text(name);
                }
                else {
                    item.find(".fa").addClass("fa-th");
                    item.find("span").text(name);
                }
                sidebarMenu.append(item);
            });
            // Admin Menu
            sidebarMenu.append('<li class="treeview"><a href="#"><i class="fa fa-files-o"></i><span>Admin</span></a><ul class="treeview-menu admin-menu"></ul></li>');
            $(".l-menu__item a").each(function () {
                var item = $("<li><a><i class=\"fa\"></i></a></li>");
                var a = item.find("a");
                a.attr("href", $(this).attr("href"));
                var name = $(this).text();
                if (name == "User") {
                    item.find(".fa").addClass("fa-user");
                    a.append(name);
                }
                else {
                    item.find(".fa").addClass("fa-circle-o");
                    a.append(name);
                }
                $(".admin-menu").append(item);
            });
            $(".l-stat, .l-header").hide();
            $(".l-separator").remove();
            $(".l-sort").removeClass("l-sort").css("margin-top", 0);
            // Add Box to Listing
            var contentSection = $('<section class="content"></section>');
            var row = $("<div class='row' />");
            var col = $("<div class='col-xs-12 col-md-7' />");
            var box = $("<div class='box'><div class='box-header'></div><div class='box-body'></div><div class='box-footer'></div></div>");
            var units = $(".units");
            contentSection.html(row);
            row.html(col);
            col.html(box);
            units.before(contentSection);
            box.html(units);
            $(".l-icon-shortcuts, .l-icon-to-top").hide();
        });
    };
    LouisAdminLTE.ucFirst = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    return LouisAdminLTE;
}());
$.ajaxSetup({
    cache: false
});
var louisAdminLTE = null;
$(document).ready(function () {
    louisAdminLTE = new LouisAdminLTE();
    louisAdminLTE.initUI();
});
//# sourceMappingURL=app.js.map