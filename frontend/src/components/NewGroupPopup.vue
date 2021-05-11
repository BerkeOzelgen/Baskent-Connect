<template>
    <div class="newgrouppopup">
        <div class="popupbox ms-5 mb-2">
            <div class="row row-newgroup-text justify-content-left ms-0 mb-2">
                <div class="col text-start "><i class="fas fa-arrow-left me-2">
                    </i><b>New Group</b></div>
            </div>
            <div class="row row-dropdown justify-content-center mb-2 ms-3 me-2">
                <form>
                    <div class="mb-3">
                    <input type="searchUser" class="form-control" id="exampleDropdownFormSearching"
                    placeholder="Search user">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.row-dropdown{
    width: 20em;
}
.popupbox{
    height: 660px;
    width: 350px;
    background-color: rosybrown;
}
.row-newgroup-text{
    color: white;
    height: 50px;
    width: 100%;
    line-height: 50px;
    background-color: seagreen;
}
</style>
